<?php
include "../auth/utility.php";

$id = $_COOKIE['chatroom'];
// check ssid
$user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
$chatroom_record = get_chatroom_with_id($id)[0];

try {
    if(!$user_record['session'])
        throw new Exception('not logged in');
} catch(Exception $e) {
    echo "Caught exception: ", $e->getMessage(),"\n";
    echo $errc["session"];
    exit($errc["session"]);
}

// check if they are already disconnected
try {
    if(!$user_record['chatroom_connection'])
        throw new Exception('already disconnected');
} catch(Exception $e) {
    echo "Caught exception: ", $e->getMessage(),"\n";
    echo $errc["chatroom"];
    exit($errc["chatroom"]);
}

set_chatroom_tokens($chatroom_record['tokens'] + 1,$id);
delete_chatroom_auth_token($user_record['session'],$user_record['chatroom_connection']);  // make sure to call these methods before logging out or the sesssion will not match
unset_chatroom_connection($user_record['session']);