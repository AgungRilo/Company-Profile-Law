<?php
// Database connection
$conn = mysqli_connect("localhost", "perh4452_peradi", "k)p*!ogmVzWR", "perh4452_peradi");

if (mysqli_connect_errno()) {
    error_log("Failed to connect to MySQL: " . mysqli_connect_error());
    exit();
}

// Get JSON data from request body
$json = file_get_contents('php://input');
if ($json === false) {
    error_log("Failed to get JSON from request body");
    echo "Invalid request data.";
    exit();
}

$data = json_decode($json, true);

// Check if JSON was decoded correctly and is an array
if (is_array($data)) {
    // Log the number of properties to check if all fields were received
    $propertyCount = count($data);
    error_log("Property count: $propertyCount");

    if ($propertyCount > 15) {
        // Parse the JSON data
        $quick = isset($data['quick']) && $data['quick'] == true ? 1 : 0;
        $device = $data['device'];
        $pesan = $data['pesan'];
        $pengirim = $data['pengirim'];
        $member = $data['member'];
        $message = $data['message'];
        $text = $data['text'];
        $sender = $data['sender'];
        $name = $data['name'];
        $type = $data['type'];

        // Prepare SQL query to prevent SQL injection
        $query = "INSERT INTO chat_whatsapp 
                  (quick, device, pesan, pengirim, member, message, text, sender, name, type) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        if ($stmt = mysqli_prepare($conn, $query)) {
            // Bind parameters (TINYINT=integer, VARCHAR=text)
            mysqli_stmt_bind_param($stmt, 'isssssssss', $quick, $device, $pesan, $pengirim, $member, $message, $text, $sender, $name, $type);

            // Execute the prepared statement
            if (mysqli_stmt_execute($stmt)) {
                echo "Data inserted successfully!";
            } else {
                // Log the error if execution fails
                error_log("Query execution failed: " . mysqli_stmt_error($stmt));
                echo "Error inserting data.";
            }

            // Close the statement
            mysqli_stmt_close($stmt);
        } else {
            // Log the error if the statement preparation fails
            error_log("Query preparation failed: " . mysqli_error($conn));
            echo "Error preparing query.";
        }

        // send notification if 'pesan' contains "Halo" or "halo"
        if (strpos($pesan, 'Halo') !== false || strpos($pesan, 'halo') !== false) {
            process_call_wa($conn, $sender, $name);
        }
    } else {
        echo "Not enough data provided.";
    }
} else {
    // Log an error if the JSON is not decoded properly
    error_log("Failed to decode JSON: " . json_last_error_msg());
    echo "Invalid JSON data.";
}

// Close the database connection
mysqli_close($conn);

// Helper function to process WhatsApp call logic
function process_call_wa($conn, $handphone, $namalengkap)
{
    $date = new DateTime("now", new DateTimeZone("Asia/Jakarta"));
    $formattedDate = $date->format('Y-m-d H:i:s');

    // Check if the customer already exists in the history_call_center table
    $sql = "SELECT * FROM history_call_center WHERE customer_phone = ?";
    if ($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, 's', $handphone);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $call_center = mysqli_fetch_assoc($result);
        mysqli_stmt_close($stmt);
    }

    $sender = "";
    $id_userWa = 0;

    if ($call_center) {
        // If the call center record exists, get user details
        $userSql = "SELECT * FROM user WHERE id_user = ?";
        if ($stmt = mysqli_prepare($conn, $userSql)) {
            mysqli_stmt_bind_param($stmt, 'i', $call_center['id_user']);
            mysqli_stmt_execute($stmt);
            $userResult = mysqli_stmt_get_result($stmt);
            $user = mysqli_fetch_assoc($userResult);
            mysqli_stmt_close($stmt);

            $sender = $user['handphone'];
            $id_userWa = $user['id_user'];

            // Update the last call time for this user in history_call_center
            $updateSql = "UPDATE history_call_center SET last_call = ? WHERE id_user = ?";
            if ($stmt = mysqli_prepare($conn, $updateSql)) {
                mysqli_stmt_bind_param($stmt, 'si', $formattedDate, $id_userWa);
                mysqli_stmt_execute($stmt);
                mysqli_stmt_close($stmt);
            }
        }
    } else {
        // Get a new user ID using logic if no existing record
        $id_userWa = getUserIDLogic($conn);

        // Fetch user details for this new user
        $userSql = "SELECT * FROM user WHERE id_user = ?";
        if ($stmt = mysqli_prepare($conn, $userSql)) {
            mysqli_stmt_bind_param($stmt, 'i', $id_userWa);
            mysqli_stmt_execute($stmt);
            $userResult = mysqli_stmt_get_result($stmt);
            $user = mysqli_fetch_assoc($userResult);
            mysqli_stmt_close($stmt);

            $sender = $user['handphone'];
        }

        // Insert a new record into history_call_center
        $insertSql = "INSERT INTO history_call_center (id_user, customer_name, customer_phone, notes_call, last_call, status_call_center) 
                      VALUES (?, ?, ?, ?, ?, ?)";
        if ($stmt = mysqli_prepare($conn, $insertSql)) {
            $status = "N";
            $notes = "";
            mysqli_stmt_bind_param($stmt, 'isssss', $id_userWa, $namalengkap, $handphone, $notes, $formattedDate, $status);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
        }
    }


    if ($sender != "") {
        $tokenSql = "SELECT * FROM token_wa WHERE id_user = ?";
        if ($stmt = mysqli_prepare($conn, $tokenSql)) {
            mysqli_stmt_bind_param($stmt, 'i', $id_userWa);
            mysqli_stmt_execute($stmt);
            $tokenResult = mysqli_stmt_get_result($stmt);
            if ($token = mysqli_fetch_assoc($tokenResult)) {
                $gettoken = $token['token'];
            } else {
                error_log("No token found for user ID: $id_userWa");
                $gettoken = ""; // Set an empty token if not found
            }
            mysqli_stmt_close($stmt);
        } else {
            error_log("Failed to prepare token query: " . mysqli_error($conn));
        }
        $notifSend = getParameterValue($conn, '@sendNotifAutoChatbotFromSystem');
        $linkGroupWaSosilisasi = getParameterValue($conn, '@linkGroupWaSosilisasi');
        if (!empty($gettoken) && $notifSend == 'Y') {
            //send group chat
            $dataSend = "Halo, Saya " . $user['nama_lengkap'] . " 
Admin Peradi, 
Silahkan Gabung Group Sosialisasi

" . $linkGroupWaSosilisasi . ".
            
Jika butuh bantuan ketik 'hai'?";
            sendDatToWA($gettoken, $dataSend, $handphone);
        } else {
            error_log("Token is empty, cannot send WhatsApp message.");
        }
    }
}


function sendDatToWA($tokenSender, $dataSend, $receiveSend)
{
    $timeSechedule = 0;
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.fonnte.com/send',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => array(
            'target' => $receiveSend,
            'message' => $dataSend,
            'url' => 'https://md.fonnte.com/images/wa-logo.png',
            'schedule' => $timeSechedule,
            'preview ' => true
        ),
        CURLOPT_HTTPHEADER => array(
            'Authorization: ' . $tokenSender // Corrected to use the actual value of $tokenSender
        ),
    ));

    $response = curl_exec($curl);
    if (curl_errno($curl)) {
        $error_msg = curl_error($curl);
    }
    curl_close($curl);

    if (isset($error_msg)) {
        // echo $error_msg;
    }
}

function getUserIDLogic($conn)
{
    $getUsersParam = getParameterValue($conn, '@logicChooseUserCS');
    $arrayUsers = explode(",", $getUsersParam);
    $idUserLogic = engineLogicPriorityCS($conn);
    $totalTry = 1;

    if ($idUserLogic == 0) {
        for ($i = 0; $i < count($arrayUsers); $i++) {
            $idUs = explode("-", $arrayUsers[$i]);
            if ((int)$idUs[1] == 0) {
                $totalTry++;
            }
        }
        if ($totalTry > 0) {
            for ($i = 0; $i < $totalTry; $i++) {
                $idUserLogic = engineLogicPriorityCS($conn);
                if ($idUserLogic > 0) {
                    break;
                }
                sleep(2);
            }
        }
    }
    return $idUserLogic;
}

function engineLogicPriorityCS($conn)
{
    $getUsersParam = getParameterValue($conn, '@logicChooseUserCS');
    $arrayUsers = explode(",", $getUsersParam); // Example: 51-1-1,52-0-2,53-1-3
    $date = new DateTime("now", new DateTimeZone("Asia/Jakarta"));
    $dateToday = $date->format('Y-m-d');
    $sql = "SELECT * FROM logic_cs WHERE DATE(time_history) = '$dateToday' ORDER BY time_history DESC";
    $cekData = mysqli_query($conn, $sql);
    $lastSequenceFromDB = 0;

    if ($cekData && mysqli_num_rows($cekData) > 0) {
        $row = mysqli_fetch_assoc($cekData);
        if ($row) {
            $lastSequenceFromDB = $row['sequence'];
        }
    }

    $totalUsersParam = count($arrayUsers);
    $totalCheckData = mysqli_num_rows($cekData);
    $choose_id_user = 0;
    $seq = 0;

    $forFase = ceil($totalCheckData / $totalUsersParam);
    $allPriority = ($forFase % 2 == 0);
    if ($cekData == null) {
        $allPriority = true;
    }

    for ($i = 0; $i < count($arrayUsers); $i++) {
        $idUs = explode("-", $arrayUsers[$i]);

        if (!$allPriority) {
            // Handle user selection when not all priority
            if ($lastSequenceFromDB == count($arrayUsers)) {
                if ((int)$idUs[2] == 1) {
                    $choose_id_user = (int)$idUs[0];
                    $seq = 1;
                    break;
                }
            } else {
                if ((int)$idUs[2] == $lastSequenceFromDB + 1) {
                    $choose_id_user = (int)$idUs[0];
                    $seq = $lastSequenceFromDB + 1;
                    break;
                }
            }
        } else {
            // Handle user selection when all priority
            if ((int)$idUs[1] > 0) {
                if ($lastSequenceFromDB == count($arrayUsers)) {
                    if ((int)$idUs[2] == 1) {
                        $choose_id_user = (int)$idUs[0];
                        $seq = 1;
                        break;
                    }
                } else {
                    if ((int)$idUs[2] == $lastSequenceFromDB + 1) {
                        $choose_id_user = (int)$idUs[0];
                        $seq = $lastSequenceFromDB + 1;
                        break;
                    }
                }
            } else {
                $seq = $lastSequenceFromDB + 1;
            }
        }
    }

    // Save the selected user and sequence to the database
    $query = "INSERT INTO logic_cs (id_user, sequence) VALUES (?, ?)";

    if ($stmt = mysqli_prepare($conn, $query)) {
        mysqli_stmt_bind_param($stmt, 'ii', $choose_id_user, $seq);

        if (mysqli_stmt_execute($stmt)) {
            echo "Data inserted successfully!";
        } else {
            error_log("Query execution failed: " . mysqli_stmt_error($stmt));
            echo "Error inserting data.";
        }

        mysqli_stmt_close($stmt);
    } else {
        error_log("Query preparation failed: " . mysqli_error($conn));
        echo "Error preparing query.";
    }

    return $choose_id_user;
}

function getParameterValue($conn, $namaParameter)
{
    $result = "";

    // Sanitize the input to prevent SQL injection
    $namaParameter = mysqli_real_escape_string($conn, $namaParameter);

    $query = "SELECT * FROM parameter WHERE nama_parameter='$namaParameter'";
    $queryResult = mysqli_query($conn, $query);

    if ($queryResult && mysqli_num_rows($queryResult) > 0) {
        $a = mysqli_fetch_assoc($queryResult);
        if ($a) {
            $result = $a['value_parameter'];
        }
    }

    mysqli_free_result($queryResult);
    return $result;
}
