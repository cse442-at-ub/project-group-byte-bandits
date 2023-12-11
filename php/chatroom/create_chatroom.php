<?php
include "../auth/utility.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    handle_login_state();
    validate_csrf_token();
    $radius = (int)$_POST['radius'];
    $tokens = 100;
    $privacy = 1;
    $description = $_POST['description'];
    $name = $_POST['name'];
    // check ssid
    $user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
    // check if they are already connected to a chatroom

    // check if they are already hosting a chatroom
    $user_location_record = get_user_location_with_id($user_record['id']);
    try {
        if($user_record['chatroom_connection']) {
            throw new Exception("already connected to a chatroom");
        }
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
    setcookie("chatroom", $id, time() + $GLOBALS['lifespan'],'/');

    set_user_chatroom_connection($chatroom_token, $_COOKIE['PHPSESSID']);
    create_new_chatroom($id,
                        $radius, 
                        $user_record['id'], 
                        $tokens, 
                        $name,
                        $description);
    create_chatroom_token($id, 
                        $chatroom_token,
                        $user_record['id'],
                        $user_record['name']);
    set_chatroom_tokens($tokens -1 , $id);
    set_chatroom_location($user_location_record[0]['longitude'], 
                        $user_location_record[0]['latitude'],
                        $id);
} else {
    forbidden_response();
}