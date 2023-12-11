<?php
include '../auth/utility.php';

if($_SERVER["REQUEST_METHOD"] === "POST") {
    check_post_record($_POST);
    handle_login_state();
    $username = $_POST["username"];
    $data = get_user_with_name($username);
    echo(json_encode($data));
} else {
    forbidden_response();
}