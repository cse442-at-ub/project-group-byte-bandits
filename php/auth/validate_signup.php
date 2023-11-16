<?php
include "utility.php";

if($_SERVER["REQUEST_METHOD"] === "POST") {
    check_post_record($_POST);
    validate_csrf_token();

    if($_POST['initiate'] == 'false') {
        handle_login_state();
        $uname = $_POST['username'];
        try {
            $rows = get_user_with_name($uname);
            if(count($rows) > 0)
                throw new Exception('username record already exists in database');
    
        } catch (Exception $e) {
            handle_exception($e, "form");
        }
        reset_user_name($uname,$_COOKIE['PHPSESSID']);
    }
    if($_POST['initiate'] === 'true') {
        $email = $_POST['email'];
        $pword = $_POST['password'];
        $pword_chk = $_POST['password_check'];
        $pword_hashed = password_hash($pword, PASSWORD_BCRYPT);

        $email = $_POST['email'];
        $email_hashed = hash("sha256", $email);
        try {
            $rows = get_user_with_email($email_hashed);
            if(count($rows) > 0)
                throw new Exception('email record already exists in database');

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new Exception('Invalid email format');
            }
            if($pword != $pword_chk)
                throw new Exception('passwords do not match');
    
            if (strlen($pword) < 8) {
                throw new Exception('Password should be at least 8 characters long');
            }
            if (!preg_match('/[a-z]/', $pword)) {
                throw new Exception('Password should contain at least one lowercase character');
            }
            if (!preg_match('/[A-Z]/', $pword)) {
                throw new Exception('Password should contain at least one uppercase character');
            }
            if (!preg_match('/[0-9]/', $pword)) {
                throw new Exception('Password should contain at least one digit');
            }
            if (!preg_match('/[\W]/', $pword)) { 
                throw new Exception('Password should contain at least one special character');
            }

        } catch (Exception $e) {
            handle_exception($e, "form");
        }
        
        $new_session_id = session_create_id('session-');
        $login_token = "auth-".bin2hex(random_bytes(16));
        setcookie("login_token", $login_token, time() + $GLOBALS['lifespan'],'/');
        session_id($new_session_id);
        create_new_user($pword_hashed,
                        $email_hashed,
                        $new_session_id);
        set_user_login_token($login_token, $new_session_id);
        session_start();
    }
} else {
    forbidden_response();
}