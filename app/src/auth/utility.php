<?php

$connection = new mysqli("oceanus.cse.buffalo.edu", 'jjalessi', '50383277','cse442_2023_fall_team_a_db');
if($connection->connect_error)
    die("connection failed: " . $connection->connect_error);

    $errc = Array(
        'form' => 197,
        'cookies' => 150,
        'sql' => -1,
        'session' => 99
    );

function get_with_sid($session_id,$connection) {
    $result = $connection->query("SELECT * FROM `authentication_data` WHERE `session` = '$session_id'");
    if($connection->connect_error)
        die("connection failed: " . $connection->connect_error);
    return $result->fetch_assoc();
}

function get_with_name($uname,$connection) {
    $result = $connection->query("SELECT * FROM `user_data` WHERE `name` = '$uname'");
    if($connection->connect_error)
        die("connection failed: " . $connection->connect_error);
    return $result->fetch_assoc();
}

function get_with_email($email,$connection) {
    $result = $connection->query("SELECT * FROM `user_data` WHERE `email` = '$email'");
    if($connection->connect_error)
        die("connection failed: " . $connection->connect_error);
    return $result->fetch_assoc();
}
function get_with_appleuser($apple_user, $connection) {
    $result = $connection->query("SELECT * FROM `user_data` WHERE `apple_user` = '$apple_user'");
    if($connection->connect_error)
        die("connection failed: " . $connection->connect_error);
    return $result->fetch_assoc();
}

function get_with_uid($userID, $connection) {       // CHANGED user_id to id
    $result = $connection->query("SELECT * FROM `user_data` WHERE `id` = '$userID'");
    if($connection->connect_error)
        die("connection failed: " . $connection->connect_error);
    return $result->fetch_assoc();

}

