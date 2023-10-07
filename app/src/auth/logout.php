<?php
include "connect.php";

try {
    $time_seconds = 10;
    $session_id = $_COOKIE['session'];
    $result = $connection->query("SELECT * FROM `user_data` WHERE `session` = '$session_id'");
    $row = $result->fetch_assoc();
    if($row) {
        if(!$connection->query("UPDATE `user_data` SET `session` = '' WHERE `session` = '$session_id'")) {
            throw new Exception('failed to remove session id from database');
        }
        unset($_COOKIE['session']);
        session_id($session_id);
        if(!setcookie("session", "",  time() - $time_seconds, "cse.buffalo.edu/~jderosa3/")) {
            throw new Exception('failed to remove session id from cookies');
        }
        session_destroy();
    }
} catch(Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
    exit(99);
}

header("Location: ../auth/login_form");
