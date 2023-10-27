<?php
include "utility.php";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $session_id = $_COOKIE['PHPSESSID'];
    if($session_id) {
        $rows = get_with_sid($session_id,$connection);
        if (count($rows) > 0) {
            header("Location: ../chatroom/message_board"); 
        }
    }
    check_post_record($_POST);
    
    $uname = $_POST['username'];
    $pword = $_POST['password'];

    try {
        $rows = get_with_name($uname,$connection);
        if(count($rows) === 0) {
            $email_hashed = hash("sha256",$uname);
            $rows = get_with_email($email_hashed,$connection);
            if(count($rows) === 0)
               throw new Exception('no record found in database');
        }
        if(!password_verify($pword, $rows[0]['password']))
            new Exception('password does not match record');

        // rehash password after evaluation ... random salt
        $pword_rehash = password_hash($pword, PASSWORD_BCRYPT);
        reset_password($rows[0]['password'],$pword_rehash,$session_id, $connection);

    } catch( Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['form']);
    }

    $new_session_id = session_create_id('auth-');
    session_id($new_session_id);
    reset_session_id($new_session_id, $uname, $connection);
    session_start();
} else {
    echo "<h1>access not permitted!! (╯°□°）╯︵ ┻━┻</h1>";
}