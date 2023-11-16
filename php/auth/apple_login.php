<?php
include "utility.php";

if($_SERVER['REQUEST_METHOD'] === 'POST') {

    check_post_record($_POST);
    validate_csrf_token();

    $apple_user = $_POST['apple_user'];

    try {
        $rows = get_user_with_apple($apple_user);
        if (count($rows) == 0) {
            throw new Exception('Apple account doesnt exist');
        }    
    } catch( Exception $e) {
        handle_exception($e, 'form');
    }
    $user_id = $row['id'];

    $new_session_id = session_create_id('auth-');
    session_id($new_session_id);
    reset_user_session_id($new_session_id, $user_id);
    session_start();

} else {
    forbidden_response();
}
