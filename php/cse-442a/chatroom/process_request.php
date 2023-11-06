<?php
include "../auth/utility.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $content = $_POST['content'];
    // check if user has connection
    $user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
    $user_chatroom_connection = $user_record['chatroom_connection'];
    $chatroom_auth_record = get_chatroom_auth_with_token($user_chatroom_connection,
                                                        $_COOKIE['PHPSESSID']);

    try {
        if(!$chatroom_auth_record)
            throw new Exception('no token found');
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        echo $errc['chatroom'];
        exit($errc["chatroom"]);
    }
    // upload content to database
    create_new_text_message(1337,
                            $user_record['name'],
                            $content);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // check if user has connection
    $user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
    $user_chatroom_connection = $user_record['chatroom_connection'];
    $chatroom_auth_record = get_chatroom_auth_with_token($user_chatroom_connection,
                                                         $_COOKIE['PHPSESSID']);
    try {
        if(!$chatroom_auth_record)
            throw new Exception('no token found');
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        echo $errc['chatroom'];
        exit($errc["chatroom"]);
    }

    // retrieve content
    $rows = get_text_with_chatroom_id(1337);
    echo json_encode($rows);
}
?>