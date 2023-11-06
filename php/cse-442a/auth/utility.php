<?php
$connection = new mysqli("oceanus.cse.buffalo.edu", 'jderosa3', 'byte-bandits','jderosa3_db');
if($connection->connect_error)
    die("connection failed: " . $connection->connect_error);

$time_seconds = 3600*24;    # 1 day
$errc = Array(
    'form' => 197,
    'cookies' => 150,
    'sql' => -1,
    'session' => 99,
    'chatroom' => 250);

function check_post_record($post) {
    try {
        foreach($post as $p) {
            if (!$p)
                throw new Exception('empty record');
        }
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        echo $errc['form'];
        exit($errc["form"]);

    }
}

function query_database(string $sql,
                        array $params,
                        string $type_string,
                        bool $retrieve = false) {
    try {
        $stmt = $GLOBALS['connection']->prepare($sql);
        if (!$stmt)
            throw new Exception("failed to prepare query");
        if(!$stmt->bind_param($type_string,...$params))
            throw new Exception("failed to bind params");
        if(!mysqli_stmt_execute($stmt))
            throw new Exception("failed to execute query");       
        if($retrieve)
            return mysqli_stmt_get_result($stmt);

    } catch (Exception $e) {
        echo "Caught exception: ", $e->getMessage(),"\n";
        echo $errc["sql"];
        exit($errc["sql"]);
    }
}

function push_rows(mysqli_result $result, bool $json = false): array {
    $rows = array();
    while($row = $result->fetch_assoc())
        if($json)
            array_push($rows, json_encode($row));
        else
            array_push($rows, $row);
    return $rows;
}

function create_new_user(string $uname, 
                         string $password, 
                         string $email, 
                         string $session_id): void {
    query_database("INSERT INTO `user_data` (`name`,`password`,`email`,`session`)  VALUES(?,?,?,?)",
                array($uname,$password,$email,$session),
                "ssss");
}

function create_new_chatroom(string $uname, string $session_id): void {
    $rows = get_user_with_sid($session_id);
    $location = $rows[0]['location'];
    $chatroom_id = rand();
    $default_radius = 100;
    $tokens = 100;
    query_database("INSERT INTO `chatroom_data` (`id`,`radius`,`location`,`host`,`tokens`) VALUES (?,?,?,?,?)",
                array($chatroom_id,$default_radius,$location,$uname,$tokens),
                "iissi");
}

function create_chatroom_token(int $chatroom_id, string $token, string $session_id): void {
    query_database("INSERT INTO `chatroom_auth` (`id`,`token`,`session`) VALUES (?,?,?)",
                array($chatroom_id,$token,$session_id),
                "iss");
}

function create_new_text_message(int $chatroom_id, string $user, string $content): void {
    query_database("INSERT INTO `text_data` (`chatroom`,`user`,`content`) VALUES (?,?,?)",
                array($chatroom_id,$user,$content),
                "iss");
}

function get_chatroom_with_id(int $chatroom_id): array {
    return push_rows(query_database("SELECT * FROM `chatroom_data` WHERE `id` = ?",
                    array($chatroom_id),
                    "i",
                    $retrieve=true));
}

function get_chatroom_auth_with_token(string $token, string $session_id): array {
    return push_rows(query_database("SELECT * FROM `chatroom_auth` WHERE `token` = ? AND `session` = ?",
                    array($token, $session_id),
                    "ss",
                    $retrieve=true));
}

function get_text_with_chatroom_id(int $chatroom_id): array {
    return push_rows(query_database("SELECT * FROM `text_data` WHERE `chatroom` = ?",
                                   array($chatroom_id),
                                   "i",
                                   $retrieve=true),true);
}

function get_user_with_sid(string $session_id): array {
    return push_rows(query_database("SELECT * FROM `user_data` WHERE `session` = ?",
                                   array($session_id),
                                   "s",
                                   $retrieve=true));
}

function get_user_with_name(string $uname): array {
    return push_rows(query_database("SELECT * FROM `user_data` WHERE `name` = ?",
                                   array($uname),
                                   "s",
                                   $retrieve=true));
}

function get_user_with_email(string $email): array {
    return push_rows(query_database("SELECT * FROM `user_data` WHERE `email` = ?",
                                   array($email),
                                   "s",
                                   $retrieve=true));
}

function set_chatroom_tokens(int $token_num, int $chatroom_id): void {
    query_database("UPDATE `chatroom_data` SET `tokens` = ? WHERE `id` = ?",
                array($token_num, $chatroom_id),
                "ii");
}

function set_user_password(string $new_password, string $session_id): void {
    query_database("UPDATE `user_data` SET `password` = ? WHERE `session` = ?",
                array($new_password, $session_id),
                "ss");
}

function reset_user_password(string $new_password, string $uname): void {
    query_database("UPDATE `user_data` SET `password` = ? WHERE `name` = ?",
                array($new_password, $uname),
                "ss");
}

function reset_user_name(string $uname, string $session_id): void {
    query_database("UPDATE `user_data` SET `name` = ? WHERE `session` = ?",
                array($uname, $session_id),
                "ss");
}

function reset_user_email(string $email, string $session_id): void {
    query_database("UPDATE `user_data` SET `email` = ? WHERE `session` = ?",
                array($email, $session_id),
                "ss");
}

function reset_user_session_id(string $session_id, string $uname): void {
    query_database("UPDATE `user_data` SET `session` = ? WHERE `name` = ?",
                array($session_id, $uname),
                "ss");
}

function set_user_chatroom_connection(string $token, string $session_id): void {
    query_database("UPDATE `user_data` SET `chatroom_connection` = ? WHERE `session` = ?",
                array($token, $session_id),
                "ss");
}

function unset_session_id(string $session_id): void {
    query_database("UPDATE `user_data` SET `session` = '' WHERE `session` = ?",
                array($session_id),
                "s");
}

function unset_chatroom_connection(string $session_id): void {
    query_database("UPDATE `user_data` SET `chatroom_connection` = '' WHERE `session` = ?",
                array($session_id),
                "s");
}

function delete_chatroom_auth_token(string $session_id): void {
    query_database("DELETE FROM `chatroom_auth` WHERE `session` = ?",
                array($session_id),
                "s");
}

function delete_user(string $session_id): void {
    query_database("DELETE FROM `user_data` WHERE `session` = ?",
                array($session_id),
                "s");
}