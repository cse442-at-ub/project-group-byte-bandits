<?php
include "utility.php";
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_post_record($_POST);
    $session_id = $_COOKIE['PHPSESSID'];
    reset_username($_POST['username'],
                    $session_id,
                    $connection);
    $rows = get_with_sid($session_id, $connection);
    reset_password($rows[0]['password'],
                    $_POST['password'],
                    $session_id,
                    $connection);
    reset_email($_POST['email'], 
                $session_id, 
                $connection);
} else if($_SERVER['REQUEST_METHOD'] === 'GET') {   // delete user
    delete_user($session_id, $connection);
} else {
    echo "<h1>uh oh access denied!! (╯°□°）╯︵ ┻━┻</h1>";
    echo "<img style='width:50%' src='media/uhoh.png'/>";
}
