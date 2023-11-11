<?php
include "utility.php";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $unameoremail = $_POST['user_emailorusername'];
    $pword = $_POST['user_password'];
    $hashed_pword = hash("sha256", $pword);

    try {
        if (empty($unameoremail)) {
            throw new Exception('Enter a username or email');
        }
        if (empty($pword)) {
            throw new Exception('Enter a password');
        }
        // checking if user's email or username exists within database
        $row = get_with_name($unameoremail, $connection);
        if (!$row) {
            $row = get_with_email($unameoremail, $connection);
        }
        if (!$row) {
            throw new Exception('Incorrect login credentials');
        }
        if ($row['password'] != $hashed_pword) {
            throw new Exception('Incorrect login credentials');
        }
        if ($row['account_method'] === 'apple'){
            throw new Exception('Email associated with an existing Apple account');
        }
        if ($row['account_method'] === 'google'){
            throw new Exception('Email associated with an existing Google account');
        }
    } catch( Exception $e) {
        // return exception to the client
        http_response_code(400); 
        echo json_encode(['error' => $e->getMessage()]);
        exit($errc['form']);
    }
     // CHANGED FROM user_id to id
    $user_id = $row['id'];    

    // creating new session id
    $time_seconds = 3600;
    $session_id = session_create_id('auth-');
    session_id($session_id);

    try {
        // establish session id for user in table that lasts 1 hour                          // CHANGED FROM user_id to id
        $connection->query("UPDATE `authentication_data` SET `session` = '$session_id' WHERE `id` = '$user_id'" );
        if($connection->connect_error) 
            throw new Exception("connection failed: " . $connection->connect_error);
        
    } catch(Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['sql']);
    }

    $row = get_with_email($unameoremail, $connection);
   
    // setting session id in cookies for user
    session_start();

    $data = [
        'Message' => 'Logging In User',
        'status' => 200,
        'user_info' => $row
    ];
    echo json_encode($data);


    
}
