<?php
include '../auth/utility.php';

handle_login_state();
validate_csrf_token();
check_post_record($_POST);

$user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
$sending_user = (int)$_POST['user'];
$response = $_POST['response'];

if ($response === 'rejected') {
    reject_friend_request($sending_user, $user_record['id']);
} else {
    accept_friend_request($sending_user, $user_record['id']);
}