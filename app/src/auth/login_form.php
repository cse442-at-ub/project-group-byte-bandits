<?php
include "utility.php";
session_start();
if(session_status() === 2) {
    if($session_id = $_COOKIE['PHPSESSID']) {
        $result = $connection->query("SELECT * FROM `user_data` WHERE `session` = '$session_id'");
        if($result->fetch_assoc())
            echo "{'response': 500}";
    }
}
?>