<?php
include "utility.php";

if($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = $_POST['user_email'];
    $pword = $_POST['user_password'];
    $pword_chk = $_POST['user_password_check'];

    try {
     // Email Checks
    if (empty($email)) {
        throw new Exception('Enter an email');
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }
    if (get_with_email($email, $connection)) {
        throw new Exception('Email already in use');
    }
    if ($email === "") {
        throw new Exception('Enter an email');
    }

    // Password Checks
    if (empty($pword)) {
        throw new Exception('Enter a password');
    }
    if (strlen($pword) < 8) {
        throw new Exception('Password should be at least 8 characters long');
    }
    if (!preg_match('/[a-z]/', $pword)) {
        throw new Exception('Password should contain at least one lowercase character');
    }
    if (!preg_match('/[A-Z]/', $pword)) {
        throw new Exception('Password should contain at least one uppercase character');
    }
    if (!preg_match('/[0-9]/', $pword)) {
        throw new Exception('Password should contain at least one digit');
    }
    if (!preg_match('/[\W]/', $pword)) { 
        throw new Exception('Password should contain at least one special character');
    }

    // Password Confirmation Checks
    if (empty($pword_chk)) {
        throw new Exception('Enter a password confirmation');
    }
    if ($pword !== $pword_chk) {
        throw new Exception('Passwords do not match');
    }
           
    } catch (Exception $e) {
        // throw error code
        http_response_code(400); 
        echo json_encode(['error' => $e->getMessage()]);
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
    // fetch id of auto increment field of user_id
    $user_id = $connection->insert_id;
    
    session_start();

    $data = [
        'Message' => 'User Created',
        'status' => 200,
        'user_info' => [
            'email' => $email,
            'session_id' => $session_id,
            'user_id' => $user_id
            
        ]
    ];
    echo json_encode($data);
    // header("Location: ../send_messages/send_xhr");
}
