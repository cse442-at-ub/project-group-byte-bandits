<?php
include "../auth/utility.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    handle_login_state();
    validate_csrf_token();
    check_post_record($_POST);
    $content = $_POST['content'];
     //check if user has connection
    $user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
    try {
        if(!isset($user_record['chatroom_connection'])) {
            throw new Exception("no session variable");
        }
        $chatroom_auth_record = get_chatroom_auth_with_token($user_record['chatroom_connection'])[0];

        if(!$chatroom_auth_record)
            throw new Exception('no token found');
    } catch (Exception $e) {
        handle_exception($e, "chatroom", $user_record['id']);
    }
   //  upload content to database
    $chatroom_id = $chatroom_auth_record['id'];
    create_new_text_message($chatroom_id, $user_record['name'],$user_record['id'], $content);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {    
    handle_login_state();

    $user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
    try {
        if(!isset($_COOKIE['chatroom'])) {
            throw new Exception("not connected");
        }
        if(!isset($user_record['chatroom_connection'])) {
            throw new Exception("not connected");
        } else {
            $chatroom_auth_record = get_chatroom_auth_with_token($user_record['chatroom_connection'])[0];
            if(!$chatroom_auth_record)
                throw new Exception('no token found');
        }
    } catch (Exception $e) {
        handle_exception($e, "chatroom", $user_record['id']);
    }

    $rows = get_text_with_chatroom_id($chatroom_auth_record['id']);
    echo json_encode($rows);
}
?>

