<?php
include "utility.php";
try {
    if($session_id = $_COOKIE['PHPSESSID']) {   
        if(get_with_sid($session_id, $connection) != false) {
            unset_session_id($session_id, $connection);
            setcookie("PHPSESSID", '', time() - $time_seconds,'/');
            session_destroy();
        } else
            throw new Exception('there is no logged in user');
    }
    
} catch(Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
    exit($errc['session']);
}

header("Location: ../auth/login_form");
