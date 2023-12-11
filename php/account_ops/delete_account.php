<?php
include '../auth/utility.php';
if($_SERVER['REQUEST METHOD'] != 'GET') {
    handle_login_state();
    validate_csrf_token();
    check_post_record($_POST);
    $session_id = $_COOKIE['PHPSESSID'];
    $user_record = get_user_with_sid($session_id)[0];
    $confirm_delete = $_POST['confirm_delete'];
    try {
        if(!password_verify($confirm_delete, $user_record['password']))
            throw new Exception('password does not match record');
    } catch( Exception $e) {
        handle_exception($e,"form");
    }

    if(isset($user_record['chatroom_connection'])) {
        delete_chatroom_auth_token($user_record['chatroom_connection']);
    }
    delete_user($session_id);
    
    if(isset($session_id)) {
        setcookie("chatroom", '', time() - $GLOBALS['lifespan'],'/');
    }
    setcookie("login_token", '', time() - $GLOBALS['lifespan'],'/');

} else {
    forbidden_response();
}