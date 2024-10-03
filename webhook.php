<?php
header('Content-Type: application/json; charset=utf-8');

echo "Webhook";
$conn = mysqli_connect("localhost", "perh4452_backup01_peradi", "oj(5tVzX@{YF", "perh4452_backup01_peradi");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);
$device = $data['device'];
$id = $data['id'];
$stateid = $data['stateid'];
$name = $data['name'];
$state = $data['state'];
$sender = $data['sender'];

mysqli_query($conn, "INSERT INTO report (id,device,target,message,status) VALUES ('$id','$name','$sender','$json','$name')");
  
// //update status and state
// if(isset($id) && isset($stateid)){
//  mysqli_query($conn,"UPDATE report SET status = '$status',state = '$state',stateid = '$stateid' WHERE id = '$id'"); 
// }else if(isset($id) && !isset($stateid)){
// mysqli_query($conn,"UPDATE report SET status = '$status' WHERE id = '$id'");
// }else{
//   mysqli_query($conn,"UPDATE report SET state = '$state' WHERE stateid = '$stateid'");
// }