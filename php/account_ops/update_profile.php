<?php
include "../auth/utility.php";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_post_record($_POST);
    $session_id = $_COOKIE['PHPSESSID'];
    reset_user_name($_POST['username'], $session_id);
    set_user_password(password_hash($_POST['password'], PASSWORD_BCRYPT), $session_id);
    reset_user_email(hash("sha256", $_POST['email']), $session_id);
} else {
    forbidden_response();
}