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

    try {
        // check if the table was updated
        $pword_hashed = hash("sha256", $pword);
        if(!$connection->query("INSERT INTO `user_data` (`name`,`password`,`email`)  VALUES('$uname','$pword_hashed','$email');")) {
            throw new Exception('failed to insert record into database');
        }
    } catch(Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit(-1);
    }
    // initate the session
    $session_id = session_create_id('auth-');
    session_id($session_id);
    setcookie("session",$session_id, 7 * 24 * 60 * 60);    # stores session id for 7 days
    session_start();
    // redirect to a different page
    header("Location: ../xhr_demo/send_xhr");
}