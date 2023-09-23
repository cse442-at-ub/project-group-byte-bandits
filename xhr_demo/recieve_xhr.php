<?php
session_start();
$connection = new mysqli("localhost", 'root',database:'app');
if($connection->connect_error)
    die("connection failed: " . $connection->connect_error);
else
    echo "connected!";
$content = $_POST['test'];
echo($content);
if($connection->query("INSERT INTO `texts`(`user`, `content`) VALUES ('root','$content')")) {
    echo "sql query sent";  
}
?>