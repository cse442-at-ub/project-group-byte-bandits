<?php
include "utility.php";

if($_SERVER["REQUEST_METHOD"] === "POST") {

    $username = $_POST['account_username'];
    $userID = $_POST['user_ID'];


    try {
        $row = get_with_name($username, $connection);
   
        if ($row) {
            throw new Exception('Username taken');
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
        $connection->query("UPDATE `user_data` SET `name` = '$username' WHERE `id` = '$userID' ");

        if($connection->connect_error) 
            throw new Exception("could not insert user data, connection error: " . $connection->connect_error);

        if($connection->error) 
            throw new Exception("could not insert user data, query error: " . $connection->error);
        
    } catch(Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['sql']);
    }
    // fetch id of auto increment field of user_id
    $row = get_with_uid($userID, $connection);
    
    session_start();

    $data = [
        'Message' => 'User Created',
        'status' => 200,
        'user_info' => $row
    ];
    echo json_encode($data);
    // header("Location: ../send_messages/send_xhr");
}
