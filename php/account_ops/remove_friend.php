<?php
include '../auth/utility.php';

if($_SERVER['REQUEST METHOD'] === 'POST') {
    handle_login_state();
    validate_csrf_token();
    check_post_record($_POST);
    $user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
    $target_user = $_POST['user'];
    remove_friend($target_user, $user_record['id']);

} else {
    forbidden_response();
}