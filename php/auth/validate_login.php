<?php
include "utility.php";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_post_record($_POST);
    validate_csrf_token();

    $session_id = $_COOKIE['PHPSESSID'];
    try {
        if($session_id) {
            $rows = $userQuery->get_user_with_sid($session_id);
            if (count($rows) > 0)
                throw new Exception("already logged in"); 
        }
    } catch( Exception $e) {
        handle_exception($e,"session");
    }

    $uname = $_POST['username'];
    $pword = $_POST['password'];

    try {
        $rows = $userQuery->get_user_with_name($uname);
        $user_record = $rows[0];
        if(count($rows) === 0) 
            throw new Exception('no record found in database');
        if(!password_verify($pword, $user_record['password']))
            throw new Exception('password does not match record');
    } catch( Exception $e) {
        handle_exception($e,"form");
    }
    $new_session_id = session_create_id('auth-');
    session_id($new_session_id);
    $userQuery->reset_user_session_id($new_session_id, $uname);
    session_start();
} else {
    forbidden_response();
}