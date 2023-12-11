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

try {
    if(!$user_record['chatroom_connection'])
        throw new Exception("not connected to chatroom");
} catch(Exception $e) {
    handle_exception($e, "chatroom",$user_record['id']);
}

// check ssid
$id = $_COOKIE['chatroom'];
$chatroom_record = get_chatroom_with_id($id)[0];

setcookie("chatroom", '', time() - $_GLOBALS['lifespan'],'/');
delete_chatroom_auth_token_by_user($user_record['id']);  // make sure to call these methods before logging out or the sesssion will not match
unset_user_chatroom_connection($_COOKIE['PHPSESSID']);
set_chatroom_tokens($chatroom_record['available'] + 1,$id);
