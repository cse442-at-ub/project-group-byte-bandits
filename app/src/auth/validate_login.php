<?php
include "utility.php";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_post_record($_POST);
    
    $uname = $_POST['name'];
    $pword = $_POST['pwd'];
    $hashed_pword = hash("sha256", $pword);
    echo $uname . "\n" . $pword;
    try {
        if(!$row = get_with_name($uname,$connection)) {
            if(!$row = get_with_email($uname,$connection))
                throw new Exception('no record found in database');
        }
        echo '('.$pword.')'. $hashed_pword;
        if(!hash_equals($row['password'], $hashed_pword))
            throw new Exception('password does not match record');

    } catch( Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['form']);
    }

    $time_seconds = 3600;
    $session_id = session_create_id('auth-');
    session_id($session_id);

    try {
        $connection->query("UPDATE `user_data` SET `session` = '$session_id' WHERE `name` = '$uname'");
        if($connection->connect_error) 
            throw new Exception("connection failed: " . $connection->connect_error);
        
    } catch(Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['sql']);
    }
    echo 200;
    session_start();
}