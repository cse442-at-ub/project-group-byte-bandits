<?php
include "utility.php";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_post_record($_POST);
    
    $unameoremail = $_POST['user_emailorusername'];
    $pword = $_POST['user_password'];
    $hashed_pword = hash("sha256", $pword);
    try {
        if(!$row = get_with_name($unameoremail,$connection)) {
            if(!$row = get_with_email($unameoremail,$connection))
                throw new Exception('Incorrect Email or Username.');
        }
        $user_id = check_password($hashed_pword, $connection);
        if ($user_id != $row['user_id']) {
            throw new Exception('Incorrect Passord.');
        }
 
    } catch( Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        // error code 197
        exit($errc['form']);
    }

    $time_seconds = 3600;
    $session_id = session_create_id('auth-');
    session_id($session_id);

    try {
        $connection->query("UPDATE `authentication_data` SET `session` = '$session_id' WHERE `user_id` = '$user_id'" );
        if($connection->connect_error) 
            throw new Exception("connection failed: " . $connection->connect_error);
        
    } catch(Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['sql']);
    }

    session_start();
}