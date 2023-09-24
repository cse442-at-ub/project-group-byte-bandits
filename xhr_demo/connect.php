<?php
$connection = new mysqli("localhost", 'root',database:'app');
if($connection->connect_error)
    die("connection failed: " . $connection->connect_error);