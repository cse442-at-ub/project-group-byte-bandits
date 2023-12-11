<?php
include '../auth/utility.php';

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_post_record($_POST);
    handle_login_state();
    validate_csrf_token();

    $user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
    $user_id = (int)$user_record['id'];
    $target_record = get_user_with_id($_POST['id'])[0];
    $target_id = (int)$target_record['id'];

    try {
        if($target_id === $user_id) {
            throw new Exception("cannot send friend request to self");
        }

        // check if there is an outgoing request

        $outgoing_requests = check_outgoing_friend_request((int)$user_id, (int)$target_id);
        $incoming_requests = check_incoming_friend_request((int)$user_id, (int)$target_id);

        if(count($outgoing_requests) > 0 || count($incoming_requests) > 0) {
            throw new Exception("theres an existing open friend request");
        }

    } catch(Exception $e) {
        handle_exception($e, 'form', $user_record['id']);
    }
    
    create_friend_request($user_id, $user_record['name'], $target_id, $target_record['name']);
} else {
    forbidden_response();
}