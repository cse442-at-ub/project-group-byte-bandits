<?php
include "utility.php";

if($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = $_POST['user_email'];
    $apple_user = $_POST['apple_user'];

    try {
        $row = get_with_appleuser($apple_user, $connection);
   
        if ($row) {
            throw new Exception('Apple account already exists');
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
        // fill user_data table first
        $connection->query("INSERT INTO `user_data` (`email`,`session`,`account_method`, `apple_user`)  VALUES('$email','$session_id', 'apple', '$apple_user')");

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
            'apple_user' => $apple_user,
            'user_id' => $user_id
        ]
    ];
    echo json_encode($data);
    // header("Location: ../send_messages/send_xhr");
}
