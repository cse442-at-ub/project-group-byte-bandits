<?php
include "../auth/utility.php";
handle_login_state();
try {
    if(isset($_COOKIE['chatroom'])) {
        $chatroom = get_chatroom_with_id($_COOKIE['chatroom'])[0];
        echo json_encode($chatroom);
    } else {
        throw new Exception("not connected to chatroom");
    }
} catch(Exception $e) {
    handle_exception($e, 'cookies');
}

