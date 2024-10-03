<?php
// Database connection
$conn = mysqli_connect("localhost", "perh4452_peradi", "k)p*!ogmVzWR", "perh4452_peradi");

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

// Get JSON data from request body
$json = file_get_contents('php://input');
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
