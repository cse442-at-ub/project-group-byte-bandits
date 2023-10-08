<?php

include "utility.php";

session_start();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(session_status() === 2) {
        if($session_id = $_COOKIE['PHPSESSID']) {
            $result = $connection->query("SELECT * FROM `user_data` WHERE `session` = '$session_id'");
            if($result->fetch_assoc())
                echo json_encode(Array('response' => 200));
            else
                echo json_encode(Array('response' => -1));
        }
    }
}
