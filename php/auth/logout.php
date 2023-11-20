<?php
include "../auth/utility.php";

$session_id = $_COOKIE['PHPSESSID'];
$user_record = get_user_with_sid($session_id)[0];

handle_login_state();
unset_chatroom_connection($session_id);
delete_chatroom_auth_token($user_record['login_token']);
unset_user_login_token($session_id);
unset_session_id($session_id);
setcookie("login_token", '', time() - $GLOBALS['lifespan'],'/');
session_destroy();