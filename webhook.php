<?php
header('Content-Type: application/json; charset=utf-8');

echo "Webhook";
$conn = mysqli_connect("localhost", "perh4452_peradi", "k)p*!ogmVzWR", "perh4452_peradi");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);
if ($data) {
    $propertyCount = count(get_object_vars($data));

    if ($propertyCount > 15) {

        $quick = $data['quick'] == true ? 1 : 0;
        $device = $data['device'];
        $pesan = $data['pesan'];
        $pengirim = $data['pengirim'];
        $member = $data['member'];
        $message = $data['message'];
        $text = $data['text'];
        $sender = $data['sender'];
        $name = $data['name'];
        $type = $data['type'];

        $query = "INSERT INTO chat_whatsapp 
                    (quick,device,pesan,pengirim,member,message,text,sender,name,type) 
                    VALUES 
                    ('$quick', '$device', '$pesan', '$member', '$message', '$text', '$sender', '$name', '$type')";

        mysqli_query($conn, $query);
    }
}

  
// //update status and state
// if(isset($id) && isset($stateid)){
//  mysqli_query($conn,"UPDATE report SET status = '$status',state = '$state',stateid = '$stateid' WHERE id = '$id'"); 
// }else if(isset($id) && !isset($stateid)){
// mysqli_query($conn,"UPDATE report SET status = '$status' WHERE id = '$id'");
// }else{
//   mysqli_query($conn,"UPDATE report SET state = '$state' WHERE stateid = '$stateid'");
// }