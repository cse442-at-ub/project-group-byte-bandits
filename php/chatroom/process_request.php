<?php
include "../auth/utility.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    handle_login_state();
    try {
        if (!isset($_SERVER['HTTP_X_CSRF_TOKEN']) || !$_SESSION['csrf_token'] === $_SERVER['HTTP_X_CSRF_TOKEN'])
            throw new Exception("invalid csrf token");
    } catch(Exception $e) {
        handle_exception($e, "form");
    }
    $content = $_POST['content'];
    // check if user has connection
    $user_record = $userQuery->get_user_with_sid($_COOKIE['PHPSESSID'])[0];
    $user_chatroom_connection = $user_record['chatroom_connection'];
    $chatroom_auth_record = $chatroomQuery->get_chatroom_auth_with_token($user_chatroom_connection, $_COOKIE['PHPSESSID'])[0];
    try {
        if(!$chatroom_auth_record)
            throw new Exception('no token found');
    } catch (Exception $e) {
        handle_exception($e, "chatroom", $user_record['id']);
    }
    // upload content to database
    $chatroom_id = $chatroom_auth_record['id'];
    $textQuery->create_new_text_message($chatroom_id, $user_record['name'], $content);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {    
    handle_login_state();
    // check if user has connection
    $user_record = $userQuery->get_user_with_sid($_COOKIE['PHPSESSID'])[0];
    $user_chatroom_connection = $user_record['chatroom_connection'];
    $chatroom_auth_record = $chatroomQuery->get_chatroom_auth_with_token($user_chatroom_connection,
                                                         $_COOKIE['PHPSESSID'])[0];
    try {
        if(!$chatroom_auth_record)
            throw new Exception('no token found');
    } catch (Exception $e) {
        handle_exception($e, "chatroom", $user_record['id']);
    }

    //retrieve content
    $rows = $textQuery->get_text_with_chatroom_id($chatroom_auth_record['id']);
    echo json_encode($rows);
}
?>