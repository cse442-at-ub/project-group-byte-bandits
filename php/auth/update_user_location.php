<?php
include 'utility.php';

if($_SERVER["REQUEST_METHOD"] === "POST") {
    check_post_record($_POST);
    handle_login_state();
    $longitude = $_POST["long"];
    $latitude = $_POST["lat"];
    $user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
    $location_records = get_user_location_with_id($user_record['id']);
    if(count($location_records) > 0) {
        set_user_location($longitude, $latitude, $_COOKIE['PHPSESSID']);
    } else {
        create_user_location_record($user_record['id'], 
                                    $_COOKIE['PHPSESSID'], 
                                    $longitude, 
                                    $latitude);
    }
    echo json_encode(["long" => $longitude, "lat" => $latitude]);
} else {
    forbidden_response();
}