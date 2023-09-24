<?php
include "connect.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $content = $_POST['content'];
    echo($content);
    // query database.. insert record from post data
    if($connection->query("INSERT INTO `texts`(`user`, `content`) VALUES ('root','$content')")) {
        echo "connected";
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // query database .. select all records
    $result = $connection->query("SELECT * FROM `texts`");
    $rows = array();
    while($row = $result->fetch_assoc()) {  # encode rows into json object format
        array_push($rows, json_encode($row));
    }
    echo json_encode($rows);    # return json strings
}
?>