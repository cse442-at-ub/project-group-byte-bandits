<?php
include "utility.php";

if($_SERVER["REQUEST_METHOD"] === "POST") {
    check_post_record($_POST);
    validate_csrf_token();
    $uname = $_POST['username'];
    $pword = $_POST['password'];
    $pword_chk = $_POST['password_check'];
    $pword_hashed = password_hash($pword, PASSWORD_BCRYPT);
    $email = $_POST['email'];
    $email_hashed = hash("sha256", $email);
    try {
        $rows = $userQuery->get_user_with_name($uname);
        if(count($rows) > 0)
            throw new Exception('username record already exists in database');
        
        $rows = $userQuery->get_user_with_email($email_hashed);
        if(count($rows) > 0)
            throw new Exception('email record already exists in database');
        if($pword != $pword_chk)
            throw new Exception('passwords do not match');

    } catch (Exception $e) {
        handle_exception($e, "form", $rows[0]['id']);
    }
    
    $new_session_id = session_create_id('auth-');
    session_id($new_session_id);
    echo $new_session_id;
    $userQuery->create_new_user($uname,
                    $pword_hashed,
                    $email_hashed,
                    $new_session_id);
    session_start();
} else {
    forbidden_response();
}