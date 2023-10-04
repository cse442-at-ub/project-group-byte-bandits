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
        if(!sizeof($row)) {
            throw new Exception('no record found in database');
        }
        // check if email exists in the daabase
        $result = $connection->query("SELECT * FROM `user_data` WHERE `email` = '$uname'");
        $row = $result->fetch_assoc();
        if(!sizeof($row)) {
            throw new Exception('no record found in database');
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
    $session_id = session_create_id('auth-');
    session_id($session_id);
    setcookie("session",$session_id, 7 * 24 * 60 * 60);    # stores session id for 7 days
    session_start();

    header("Location: ../xhr_demo/send_xhr");
}