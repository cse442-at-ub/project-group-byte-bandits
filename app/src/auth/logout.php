<?php
include "connect.php";
include "utility.php";
try {
    $time_seconds = 3600;
    if($session_id = $_COOKIE['PHPSESSID']) {   
        if(get_with_sid($session_id,$connection)) {
            $connection->query("UPDATE `user_data` SET `session` = '' WHERE `session` = '$session_id'");
            if($connection->connect_error)
                die("connection failed: " . $connection->connect_error);
            unset($_COOKIE['PHPSESSID']);
            session_destroy();
        } else
            throw new Exception('there is no logged in user');
    }
    
} catch(Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
    exit($errc['session']);
}

header("Location: ../auth/login_form");
