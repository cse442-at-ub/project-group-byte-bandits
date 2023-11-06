<?php
include "../auth/utility.php";
try {
    if($session_id = $_COOKIE['PHPSESSID']) {   
        if(get_user_with_sid($session_id) != false) {
            unset_chatroom_connection($session_id);
            delete_chatroom_auth_token($session_id);
            unset_session_id($session_id);
            setcookie("PHPSESSID", '', time() - $time_seconds,'/');
            session_destroy();
        } else
            throw new Exception('there is no logged in user');
    }
    
} catch(Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
    exit($errc['session']);
}