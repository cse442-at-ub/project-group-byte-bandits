<?php
include "../auth/utility.php";
handle_login_state();
$user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
try {
    if(!isset($_COOKIE['chatroom']))
        throw new Exception("could not retrieve chatroom");
} catch(Exception $e) {
    handle_exception($e, "cookies",$user_record['id']);
}

// check ssid
$id = $_COOKIE['chatroom'];
$chatroom_record = get_chatroom_with_id($id)[0];

// check if they are already disconnected
try {
    if(!$user_record['chatroom_connection'])
        throw new Exception('already disconnected');
} catch(Exception $e) {
    handle_exception($e, "chatroom", $user_record['id']);
}

setcookie("chatroom", '', time() - $_GLOBALS['lifespan'],'/');
unset_chatroom_connection($user_record['session']);
set_chatroom_tokens($chatroom_record['max_persons'] + 1,$id);
delete_chatroom_auth_token($user_record['login_token']);  // make sure to call these methods before logging out or the sesssion will not match
