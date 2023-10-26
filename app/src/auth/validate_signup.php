<?php
include "utility.php";

if($_SERVER["REQUEST_METHOD"] === "POST") {
    check_post_record($_POST);
    $uname = $_POST['username'];
    $pword = $_POST['password'];
    $pword_chk = $_POST['password_check'];
    $pword_hashed = password_hash($pword, PASSWORD_BCRYPT);
    $email = $_POST['email'];
    $email_hashed = hash("sha256", $email);
    try {
        $rows = get_with_name($uname,$connection);
        if(count($rows) > 0)
            throw new Exception('username record already exists in database');
        
        $rows = get_with_email($email_hashed,$connection);
        if(count($rows) > 0)
            throw new Exception('email record already exists in database');
        if($pword != $pword_chk)
            throw new Exception('passwords do not match');

    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['form']);
    }
    
    $session_id = session_create_id('auth-');
    session_id($session_id);
    create_new_user($uname,$pword_hashed,$email_hashed,$session_id,$connection);
    session_start();
} else {
    echo "<h1>access not permitted!! (╯°□°）╯︵ ┻━┻</h1>";
}