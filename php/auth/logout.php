<?php
include "../auth/utility.php";
try {
    if(isset($_COOKIE['PHPSESSID'])) {   
        $session_id = $_COOKIE['PHPSESSID'];
        if($userQuery->get_user_with_sid($session_id) != false) {
            $userQuery->unset_chatroom_connection($session_id);
            $chatroomQuery->delete_chatroom_auth_token($session_id);
            $userQuery->unset_session_id($session_id);
            setcookie("PHPSESSID", '', time() - $_GLOBALS['lifespan'],'/');
            session_destroy();
        } else
            throw new Exception('there is no logged in user');
    }
    
} catch(Exception $e) {
    handle_exception($e, "session");
}