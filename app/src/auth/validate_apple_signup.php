<?php
include "utility.php";

if($_SERVER["REQUEST_METHOD"] === "POST") {
    echo 'CREATING ACCOUNT'
    check_post_record($_POST);

    $uname = $_POST['username'];
    $pword = $_POST['password'];
    $pword_chk = $_POST['password_check'];
    $email = $_POST['email'];

    try {
        if(get_with_name($uname,$connection))
            throw new Exception('username record already exists in database');
        if(get_with_email($email,$connection))
            throw new Exception('email record already exists in database');
        if($pword != $pword_chk)
            throw new Exception('passwords do not match');        
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['form']);
    }

    $time_seconds = 3600;
    $session_id = session_create_id('auth-');
    session_id($session_id);

    try {        
        $pword_hashed = hash("sha256", $pword);
        $connection->query("INSERT INTO `user_data` (`name`,`password`,`email`,`session`)  VALUES('$uname','$pword_hashed','$email','$session_id')");
        if($connection->connect_error) 
            throw new Exception("could not insert user data, connection error: " . $connection->connect_error);

    } catch(Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['sql']);
    }
    
    session_start();
    header("Location: ../send_messages/send_xhr");
}