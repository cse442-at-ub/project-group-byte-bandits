<?php
include "../auth/utility.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // check ssid
    handle_login_state();
    login_token_forwarding();
    validate_csrf_token();
    $id = $_POST['id'];
    $user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
    $chatroom_record = get_chatroom_with_id($id)[0];
    // check if they are already connected to a chatroom
    $reconnecting = false;
    try {
        if($user_record['chatroom_connection']) {
            $chatroom_auth_record = get_chatroom_auth_with_token($user_record['chatroom_connection'], 
                                                                $_COOKIE['login_token'])[0];
            if($chatroom_auth_record['id'] != $id)
                throw new Exception('already connected to chatroom ' . $chatroom_auth_record['id']);
            $reconnecting = true;
        }
    } catch(Exception $e) {
        handle_exception($e, "chatroom", $user_record['id']);
    }

    // check users location data
    function cartesian_distance(array $user,array $chatroom): float {
        $x_dist = $chatroom['long']-$user['long'];
        $y_dist = $chatroom['lat']-$user['lat'];
        return sqrt(pow($x_dist,2) + pow($y_dist,2));
    }

    try {
        $user_location_record = get_user_location_with_id($user_record['id']);
        if(count($user_location_record) == 0) {
            throw new Exception("couldnt access location data");
        }
        $user_location = array($user_location_record[0]['long'], $user_location_record[0]['lat']);
        $chatroom_location = array($chatroom_record['long'], $chatroom_record['lat']);
        $chatroom_rad = $chatroom_record['radius'];

        if(cartesian_distance($user_location,$chatroom_location) > $chatroom_rad)
            throw new Exception('out of chatroom range');

    } catch(Exception $e) {
        handle_exception($e, "chatroom", $user_record['id']);
    }

    if (!$reconnecting) {
        setcookie("chatroom", $id, time()+$GLOBALS['lifespan'],'/');
        // generate new chatroom auth token
        $chatroom_token = bin2hex(random_bytes(16));
        set_user_chatroom_connection($chatroom_token, $_COOKIE['PHPSESSID']);
        create_chatroom_token($id, $chatroom_token, $user_record['login_token'],$user_record['id']);
        set_chatroom_tokens($chatroom_record['max_persons'] -1 , $id);
    }
} else {
    forbidden_response();
}