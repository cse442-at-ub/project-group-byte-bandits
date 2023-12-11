<?php
include "../auth/utility.php";
handle_login_state();
try {
    if(isset($_COOKIE['chatroom'])) {
        $chatroom = get_chatroom_with_id($_COOKIE['chatroom'])[0];
        $chatroom_id = $chatroom['id'];
        $users = get_users_from_chatroom($chatroom_id);
        echo json_encode($users);
    } else {
        throw new Exception("not connected to chatroom");
    }
} catch(Exception $e) {
    handle_exception($e, 'cookies');
}