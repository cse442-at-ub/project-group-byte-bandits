<?php
include "../auth/utility.php";

$session_id = $_COOKIE['PHPSESSID'];
$user_record = get_user_with_sid($session_id)[0];

handle_login_state();
unset_user_login_token($session_id);
unset_session_id($session_id);
if(isset($_COOKIE['chatroom'])) {
    setcookie("chatroom", '', time() - $GLOBALS['lifespan'],'/');
}
if(isset($user_record['chatroom_connection'])) {
    delete_chatroom_auth_token($user_record['chatroom_connection']);
    unset_user_chatroom_connection($session_id);
}
setcookie("login_token", '', time() - $GLOBALS['lifespan'],'/');