<?php
include "utility.php";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $session_id = $_COOKIE['PHPSESSID'];
    if($session_id) {
        $rows = get_user_with_sid($session_id);
        if (count($rows) > 0) {
            header("Location: ../chatroom/message_board"); 
        }
    }
    check_post_record($_POST);
    
    $uname = $_POST['username'];
    $pword = $_POST['password'];

    try {
        
        $rows = get_user_with_name($uname);
        if(count($rows) === 0)
            throw new Exception('no record found in database');
        if(!password_verify($pword, $rows[0]['password']))
            new Exception('password does not match record');
    } catch( Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['form']);
    }
    $pword_rehash = password_hash($pword, PASSWORD_BCRYPT);
    reset_user_password($pword_rehash,$uname);
    
    $new_session_id = session_create_id('auth-');
    session_id($new_session_id);
    reset_user_session_id($new_session_id, $uname);
    session_start();
} else {
    http_response_code(401);
    echo "<h1>access not permitted!! (╯°□°）╯︵ ┻━┻</h1>";
}