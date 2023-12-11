<?php
include "utility.php";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_post_record($_POST);
    validate_csrf_token();

    $session_id = $_COOKIE['PHPSESSID'];
    try {
        if(isset($_COOKIE['login_token'])) {
            $rows = get_user_with_login_token($_COOKIE['login_token']);
            if (count($rows) > 0)
                throw new Exception("already logged in"); 
        }
    } catch( Exception $e) {
        handle_exception($e,"session");
    }

    $uname = $_POST['username'];
    $pword = $_POST['password'];
    $rows = get_user_with_name($uname);

    try {
        if(count($rows) === 0) 
            throw new Exception('no record found in database');
        $user_record = $rows[0];
        if(!password_verify($pword, $user_record['password']))
            throw new Exception('password does not match record');
    } catch( Exception $e) {
        handle_exception($e,"form");
    }
    $new_session_id = session_create_id('session-');
    $login_token = "auth-".bin2hex(random_bytes(16));
    session_id($new_session_id);
    setcookie("login_token", $login_token, time() + $GLOBALS['lifespan'],'/');
    reset_user_session_id($new_session_id, $rows[0]['id']);
    set_user_login_token($login_token, $new_session_id);
    session_start();
} else {
    forbidden_response();
}