<?php
include 'utility.php';

if($_SERVER["REQUEST_METHOD"] === "POST") {
    check_post_record($_POST);
    handle_login_state();
    //validate_csrf_token();
    $user_id = $_POST["user_id"];
    $longitude = $_POST["long"];
    $latitude = $_POST["lat"];

    // manually creating location object
    $location = json_encode(["long" => $longitude, "lat" => $latitude]);

    // update user's location in table
    set_user_location($location, $_COOKIE['PHPSESSID']);

    $data = [
        'Message' => 'Updated User Location',
        'status' => 200,
        'user_info' => [
            'user_id' => $user_id,
            'longitude' => $longitude,
            'latitude' => $latitude
        ]
    ];
    echo json_encode($data);
} else {
    forbidden_response();
}