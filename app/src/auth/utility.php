<?php
$connection = new mysqli("oceanus.cse.buffalo.edu", 'jderosa3', 'byte-bandits','jderosa3_db');
if($connection->connect_error)
    die("connection failed: " . $connection->connect_error);

$errc = Array(
    'form' => 197,
    'cookies' => 150,
    'sql' => -1,
    'session' => 99);

function check_post_record($post) {
    try {
        foreach($post as $p) {
            if (!$p) {
                throw new Exception('empty record');
            }
        }
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['form']);
    }
}

function get_with_sid($session_id,$connection) {
    $result = $connection->query("SELECT * FROM `user_data` WHERE `session` = '$session_id'");
    if($connection->connect_error)
        die("connection failed: " . $connection->connect_error);
    return $result->fetch_assoc();
}

function get_with_name($uname,$connection) {
    $result = $connection->query("SELECT * FROM `user_data` WHERE `name` = '$uname'");
    if($connection->connect_error)
        die("connection failed: " . $connection->connect_error);
    return $result->fetch_assoc();
}

function get_with_email($email,$connection) {
    $result = $connection->query("SELECT * FROM `user_data` WHERE `email` = '$email'");
    if($connection->connect_error)
        die("connection failed: " . $connection->connect_error);
    return $result->fetch_assoc();
}
