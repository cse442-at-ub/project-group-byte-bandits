<?php

$errc = Array(
    'form' => 197,
    'cookies' => 150,
    'sql' => -1);

function check_post_record($post) {
    try {
        foreach($post as $p) {
            if (!$p) {
                throw new Exception('empty record');
            }
        }
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['form']);
    }
}

function check_sql_request($result) {
    try {
        if($connection->connect_error) 
            throw new Exception("failed to get user data");
    } catch {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit($errc['sql']);
    }
}

function get_with_name($uname) {
    $result = $connection->query("SELECT * FROM `user_data` WHERE `name` = '$uname'");
    check_sql_request($result);
    return = $result->fetch_assoc();
}

function get_with_email($email) {
    $result = $connection->query("SELECT * FROM `user_data` WHERE `email` = '$email'");
    check_sql_request();
    return = $result->fetch_assoc();
}
