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

try {
    if($chatroom_record['host'] != $user_record['id'])
        throw new Exception("not host to chatroom");
} catch(Exception $e) {
    handle_exception($e, "chatroom",$user_record['id']);
}

setcookie("chatroom", '', time() - $_GLOBALS['lifespan'],'/');
unset_user_chatroom_connection($_COOKIE['PHPSESSID']);
delete_chatroom_auth_token_with_chatroom($chatroom_record['id']); // delete texts by chatroom
delete_chatroom_with_id($chatroom_record['id']); // delete chatroom by id
delete_text_with_chatroom($chatroom_record['id']);