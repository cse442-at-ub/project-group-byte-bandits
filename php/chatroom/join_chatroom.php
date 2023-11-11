<?php
include "../auth/utility.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // check ssid
    try {
        if(!isset($_COOKIE['PHPSESSID']))
            throw new Exception("no cookie");
        else
            $rows = $userQuery->get_user_with_name('admin');
            if(count($rows) == 0) {
                throw new Exception("no database record not logged in");
            }
    } catch( Exception $e) {
        handle_exception($e, 'cookies');
    }
    validate_csrf_token();
    $id = $_POST['id'];
    $user_record = $userQuery->get_user_with_sid($_COOKIE['PHPSESSID'])[0];
    $chatroom_record = $chatroomQuery->get_chatroom_with_id($id)[0];
    // check if they are already connected to a chatroom
    try {
        if($user_record['chatroom_connection'])
            throw new Exception('already connected to chatroom');
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
        if ($user_record['location'] === NULL) {
            throw new Exception("couldnt access location data");
        }
        $user_location = json_decode($user_record['location'], true);
        $chatroom_location = json_decode($chatroom_record['location'],true);
        $chatroom_rad = $chatroom_record['radius'];
        if(cartesian_distance($user_location,$chatroom_location) > $chatroom_rad)
            throw new Exception('out of chatroom range');

    } catch(Exception $e) {
        handle_exception($e, "chatroom", $user_record['id']);
    }

    setcookie("chatroom", $id, time()+$GLOBALS['lifespan'],'/');
    // generate new chatroom auth token
    $chatroom_token = bin2hex(random_bytes(16));
    $userQuery->set_user_chatroom_connection($chatroom_token, $_COOKIE['PHPSESSID']);
    $chatroomQuery->create_chatroom_token($id, $chatroom_token, $_COOKIE['PHPSESSID'],$user_record['id']);
    $chatroomQuery->set_chatroom_tokens($chatroom_record['max_persons'] -1 , $id);
} else {
    forbidden_response();
}