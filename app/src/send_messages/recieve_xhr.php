<?php
include "connect.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $content = $_POST['content'];
    echo($content);
    if($connection->query("INSERT INTO `texts`(`user`, `content`) VALUES ('root','$content')")) {
        echo "successful insert";
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $connection->query("SELECT * FROM `texts`");
    $rows = array();
    while($row = $result->fetch_assoc()) {
        array_push($rows, json_encode($row));
    }
    echo json_encode($rows);
}
?>