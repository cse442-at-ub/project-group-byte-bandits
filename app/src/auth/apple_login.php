<?php
include "utility.php";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $apple_user = $_POST['apple_user'];

    try {
        $row = get_with_appleuser($apple_user, $connection);

        if (!$row) {
            throw new Exception('Apple account doesnt exist');
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
        // establish session id for user in table that lasts 1 hour     // CHANGED FROM user_id to id
        $connection->query("UPDATE `user_data` SET `session` = '$session_id' WHERE `id` = '$user_id'" );
        if($connection->connect_error) 
            throw new Exception("connection failed: " . $connection->connect_error);
        
    } catch(Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['sql']);
    }

    $row = get_with_appleuser($apple_user, $connection);
    // setting session id in cookies for user
    session_start();

    $data = [
        'Message' => 'Logging In User With Apple',
        'status' => 200,
        'user_info' => $row
    ];
    echo json_encode($data);
}
