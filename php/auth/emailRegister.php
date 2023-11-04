<?php
// include "utility.php";

if($_SERVER["REQUEST_METHOD"] === "post") {
    echo 'CREATING ACCOUNG';
    check_post_record($_POST);

    $email = $_POST['email'];
    $pword = $_POST['password'];
    $pword_chk = $_POST['password_check'];

    try {
        if(get_with_email($email,$connection))
            throw new Exception('Email already in use.');
        if($pword != $pword_chk)
            throw new Exception('Passwords must match.');        
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['form']);
    }

    $time_seconds = 3600;
    $session_id = session_create_id('auth-');
    session_id($session_id);

    try {        
        $pword_hashed = hash("sha256", $pword);
        // fill user_data table first
        $connection->query("INSERT INTO `user_data` (`email`,`password`,`session`,`account_method`)  VALUES('$email', '$pword_hashed','$session_id', 'email')");

        if($connection->connect_error) 
            throw new Exception("could not insert user data, connection error: " . $connection->connect_error);

        if($connection->error) 
            throw new Exception("could not insert user data, query error: " . $connection->error);
        
    } catch(Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['sql']);
    }
    
    session_start();

    $data = [
        'Message' => 'User Created',
        'status' => 200,
        'user_info' => [
            'email' => $email,
            'password' => $pword, // Remove this line for production!
            'session_id' => $session_id
        ]
    ];
    echo json_encode($data);
    // header("Location: ../send_messages/send_xhr");
}