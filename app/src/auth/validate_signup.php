<?php
include "connect.php";
include "utility.php";

if($_SERVER["REQUEST_METHOD"] === "POST") {
    check_post_record($_POST);

    $uname = $_POST['username'];
    $pword = $_POST['password'];
    $pword_chk = $_POST['password_check'];
    $email = $_POST['email'];

    try {
        // check if a user already exists with the same username
        $result = $connection->query("SELECT * FROM `user_data` WHERE `name` = '$uname'");
        $row = $result->fetch_assoc();
        if(sizeof($row)) {
            throw new Exception('username record already exists in database');
        }
        // check if a user already exists with the same email
        $result = $connection->query("SELECT * FROM `user_data` WHERE `email` = '$email'");
        $row = $result->fetch_assoc();
        if(sizeof($row)) {
            throw new Exception('email record already exists in database');
        }
        // check if the passwords match
        if($pword != $pword_chk) throw new Exception('passwords do not match');
        
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit(197);
    }

    $pword_hashed = hash("sha256", $pword);
    try {
        // check if the table was updated
        if(!$connection->query("INSERT INTO `user_data` (`name`,`password`,`email`)  VALUES('$uname','$pword_hashed','$email');")) {
            throw new Exception('failed to insert record into database');
        }
    } catch(Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit(-1);
    }
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