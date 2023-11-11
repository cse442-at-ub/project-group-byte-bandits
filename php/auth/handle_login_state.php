<?php
include 'utility.php';
$login_state = 'success';

if(!isset($_COOKIE['PHPSESSID']))
    $login_state = "no cookie";
else {
    $rows = $userQuery->get_user_with_sid($_COOKIE['PHPSESSID']);
    if(count($rows) == 0) {
        $login_state = "no database record not logged in";
    }
}

$response = [ 'login_state' => $login_state];
echo json_encode($response);