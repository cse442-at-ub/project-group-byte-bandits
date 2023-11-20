<?php
include "../auth/utility.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    handle_login_state();
    validate_csrf_token();
    $radius = (int)$_POST['radius'];
    $tokens = (int)$_POST['maxpersons'];
    $privacy = $_POST['privacy'];
    // check ssid
    $user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];

    // check if they are already hosting a chatroom
    $user_location_record = get_user_location_with_id($user_record['id']);
    try {
        $rows = get_chatroom_with_host($user_record['id']);
        if(count($rows) > 0)
            throw new Exception("already hosting a chatroom");
        if(count($user_location_record) == 0)
            throw new Exception("already hosting a chatroom");
    } catch( Exception $e) {
        handle_exception($e,'chatroom',$user_record['id']);
    }

    $id = random_int(0,10000);
    $chatroom_token = bin2hex(random_bytes(16));
    set_user_chatroom_connection($chatroom_token, $_COOKIE['PHPSESSID']);
    create_new_chatroom($id, $radius, $user_record['id'], $tokens);
    create_chatroom_token($id, 
                        $chatroom_token,
                        $user_record['login_token'], 
                        $user_record['name']);
    set_chatroom_tokens($tokens -1 , $id);
    set_chatroom_location($user_location_record[0]['long'], 
                        $user_location_record[0]['lat'],
                        $id);
} else {
    forbidden_response();
}