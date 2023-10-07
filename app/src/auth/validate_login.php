<?php
include "connect.php";
include "utility.php";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_post_record($_POST);
    
    $uname = $_POST['username'];
    $pword = $_POST['password'];
    $hashed_pword = hash("sha256", $pword);

    try {
        // check if user exists in the daabase
        $result = $connection->query("SELECT * FROM `user_data` WHERE `name` = '$uname'");
        $row = $result->fetch_assoc();
        if(!$row) {
            $result = $connection->query("SELECT * FROM `user_data` WHERE `email` = '$uname'");
            $row = $result->fetch_assoc();
            if(!$row) {
                throw new Exception('no record found in database');
            }
        }
        // check if the pasword matches the one found in the database
        if(!hash_equals($row['password'], $hashed_pword)) {
            throw new Exception('password does not match record');
        }

    } catch( Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit(198);
    }

    // initiate the session
    try {
        $time_seconds = 10;
        $session_id = session_create_id('auth-');
        session_id($session_id);
        if(!setcookie("session", $session_id,  time() + $time_seconds, "cse.buffalo.edu/~jderosa3/")) {
            throw new Exception('failed to retrieve session id from cookies');
        }
    } catch(Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit(150);
    }

    $connection->query("UPDATE `user_data` SET `session` = '$session_id' WHERE `name` = '$uname'");
    if($connection->connect_error) die("connection failed: " . $connection->connect_error);
    
    session_start();
    header("Location: ../xhr_demo/send_xhr");
}