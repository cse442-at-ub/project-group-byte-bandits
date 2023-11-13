<?php
include 'utility.php';

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    //check_post_record($_POST);
    //handle_login_state();
    validate_csrf_token();
    $userQuery->set_user_location($_POST['location'],$_COOKIE['PHPSESSID']);
} else {
    forbidden_response();
}