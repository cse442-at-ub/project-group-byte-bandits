<?php
include "utility.php";

if($_SERVER["REQUEST_METHOD"] === "POST") {
    check_post_record($_POST);
    validate_csrf_token();

    $email = $_POST['user_email'];
    $apple_user = $_POST['apple_user'];

    try {
        $rows = get_user_with_apple($apple_user);
        if (count($rows) > 0)
            throw new Exception('Apple account already exists');
    } catch (Exception $e) {
        handle_exception($e, 'form');
    }

    $new_session_id = session_create_id('auth-');
    session_id($new_session_id);

    create_apple_user($email, $new_session_id, $apple_user);
    session_start();
} else {
    forbidden_response();
}
