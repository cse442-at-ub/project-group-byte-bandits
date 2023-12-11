<?php
include 'db_connection.php';
$lifespan = 3600*24;    # 1 day

function validate_csrf_token(): void {
    try {
        session_start();
        if (!isset($_SERVER['HTTP_X_CSRF_TOKEN']) || !($_SESSION['csrf_token'] === $_SERVER['HTTP_X_CSRF_TOKEN']))
            throw new Exception("invalid csrf token" . "\n server " . $_SERVER['HTTP_X_CSRF_TOKEN'] . "\n session " . $_SESSION['csrf_token']);
        session_destroy();
        } catch(Exception $e) {
        handle_exception($e, "form");
    }
}

function handle_exception(Exception $e, string $type, int $user = 0): void {
    $errc = Array(
        'form' => 197,
        'cookies' => 150,
        'sql' => -1,
        'session' => 99,
        'chatroom' => 250);
    create_new_error_log($errc[$type],$e->getMessage(),$user,$_SERVER['REMOTE_ADDR']);
    $message = "Caught exception: ". $e->getMessage();
    echo json_encode(["code" => $errc[$type], "response" => $message]);
    exit($errc[$type]);
}

function forbidden_response(): void {
    http_response_code(403);
    echo json_encode(["response" => "access not permitted!"]);
}

function check_post_record($post): void {
    try {
        foreach($post as $p) {
            if (!$p) throw new Exception('empty record');
        }
    } catch (Exception $e) {
        handle_exception($e, "form");
    }
}

function query_database(string $sql,
                        array $params,
                        string $type_string,
                        bool $retrieve = false) {
    try {
        $stmt = $GLOBALS['connection']->prepare($sql);
        if (!$stmt) throw new Exception("failed to prepare query");
        if(!$stmt->bind_param($type_string,...$params)) throw new Exception("failed to bind params");
        if(!mysqli_stmt_execute($stmt)) throw new Exception("failed to execute query");       
        if($retrieve)
            return mysqli_stmt_get_result($stmt);

    } catch (Exception $e) {
        handle_exception($e,"sql",);
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

function handle_login_state() {
    try {
        if(!isset($_COOKIE['PHPSESSID']))
            throw new Exception("no session cookie");
        else
            $rows = get_user_with_sid($_COOKIE['PHPSESSID']);
            if(count($rows) == 0) {
                throw new Exception("no database record not logged in");
            }
    } catch( Exception $e) {
        handle_exception($e, 'cookies');
    }
}

function login_token_forwarding() {
    try {
        if(!isset($_COOKIE['login_token']))
            throw new Exception("no login_token cookie");
        else
            $rows = get_user_with_login_token($_COOKIE['login_token']);
            if(count($rows) == 0) {
                throw new Exception("no login token in database");
            }
    } catch( Exception $e) {
        handle_exception($e, 'cookies');
    }
}

function create_new_user(string $password, 
                        string $email, 
                        string $session_id): void {
    query_database("INSERT INTO `user_data` (`password`,`email`,`session`)  VALUES(?,?,?)",
                array($password,$email,$session_id),
                "sss");
}

function create_apple_user(string $email, string $session_id, string $apple_user): void {
    query_database("INSERT INTO `user_data` (`email`,`session`,`account_method`, `apple_user`)  VALUES(?,?, 'apple', ?)",
                    array($email, $session_id, $apple_user),
                    "sss");
}

function get_user_with_sid(string $session_id): array {
    return push_rows(query_database("SELECT * FROM `user_data` WHERE `session` = ?",
                                    array($session_id),
                                    "s",
                                    $retrieve=true));
}

function get_user_with_id(int $id): array {
    return push_rows(query_database("SELECT * FROM `user_data` WHERE `id` = ?",
                                    array($id),
                                    "i",
                                    $retrieve=true));
}

function get_user_with_login_token(string $login_token): array {
    return push_rows(query_database("SELECT * FROM `user_data` WHERE `login_token` = ?",
                                    array($login_token),
                                    "s",
                                    $retrieve=true));
}

function get_user_with_apple($apple_user) {
    return push_rows(query_database("SELECT * FROM `user_data` WHERE `apple_user` = ?",
                                    array($apple_user),
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

function get_user_location_with_id(int $id) {
    return push_rows(query_database("SELECT * FROM `user_location_data` WHERE `user_id` = ?",
                                    array($id),
                                    "i",
                                    $retrieve=true));
}

function get_user_location_with_sid(string $session_id) {
    return push_rows(query_database("SELECT * FROM `user_location_data` WHERE `session` = ?",
                                    array($session_id),
                                    "s",
                                    $retrieve=true));
}

function set_user_login_token(string $login_token, string $session_id) {
    query_database("UPDATE `user_data` SET `login_token` = ? WHERE `session` = ?",
                    array($login_token, $session_id),
                    "ss");
}

function set_user_password(string $new_password, string $session_id): void {
    query_database("UPDATE `user_data` SET `password` = ? WHERE `session` = ?",
                array($new_password, $session_id),
                "ss");
}
function set_user_chatroom_connection(string $chatroom_connection, string $session_id): void {
    query_database("UPDATE `user_data` SET `chatroom_connection` = ? WHERE `session` = ?",
                array($chatroom_connection, $session_id),
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

function reset_user_session_id(string $session_id, int $id): void {
    query_database("UPDATE `user_data` SET `session` = ? WHERE `id` = ?",
                array($session_id, $id),
                "si");
}

function unset_session_id(string $session_id): void {
    query_database("UPDATE `user_data` SET `session` = '' WHERE `session` = ?",
                array($session_id),
                "s");
}

function unset_user_login_token(string $session_id): void {
    query_database("UPDATE `user_data` SET `login_token` = '' WHERE `session` = ?",
                    array($session_id),
                    "s");
}

function unset_user_chatroom_connection(string $session_id): void {
    query_database("UPDATE `user_data` SET `chatroom_connection` = '' WHERE `session` = ?",
                    array($session_id),
                    "s");
}

function create_user_location_record(int $user_id, string $session_id, float $long, float $lat) {
    query_database("INSERT INTO `user_location_data` (`user_id`,`session`,`longitude`, `latitude`)  VALUES(?,?,?,?)",
                    array($user_id, $session_id, $long, $lat),
                    "isdd");
}

function set_user_location(float $long, float $lat, string $session_id): void {
    query_database("UPDATE `user_location_data` SET `longitude` = ?, `latitude` = ? WHERE `session` = ?",
                array($long, $lat, $session_id),
                "dds");
}

function delete_user(string $session_id): void {
    query_database("DELETE FROM `user_data` WHERE `session` = ?",
                array($session_id),
                "s");
}

function create_new_chatroom(int $id, int $radius, int $host, int $tokens, string $name, string $description): void {
    query_database("INSERT INTO `chatroom_data` (`id`,`radius`, `host`, `max_persons`, `available`, `name`, `description`) VALUES (?,?,?,?,?,?,?)",
                array($id,$radius,$host,$tokens, $tokens,$name,$description),
                "iiiiiss");
}

function get_chatroom_with_id(int $chatroom_id): array {
    return push_rows(query_database("SELECT * FROM `chatroom_data` WHERE `id` = ?",
                    array($chatroom_id),
                    "i",
                    $retrieve=true));
}

function get_chatroom_with_host(int $host): array {
    return push_rows(query_database("SELECT * FROM `chatroom_data` WHERE `host` = ?",
                    array($host),
                    "i",
                    $retrieve=true));
}

function create_chatroom_token(int $chatroom_id, string $token, int $user, string $user_name): void {
    query_database("INSERT INTO `chatroom_auth` (`id`,`chatroom_connection`, `user`, `user_name`) VALUES (?,?,?,?)",
                array($chatroom_id,$token,$user,$user_name),
                "isis");
}

function get_chatroom_auth_with_token(string $token): array {
    return push_rows(query_database("SELECT * FROM `chatroom_auth` WHERE `chatroom_connection` = ?",
                    array($token),
                    "s",
                    $retrieve=true));
}

function get_chatroom_auth_with_user(int $user_id): array {
    return push_rows(query_database("SELECT * FROM `chatroom_auth` WHERE `user` = ?",
                    array($user_id),
                    "i",
                    $retrieve=true));
}

function get_users_from_chatroom(int $chatroom_id): array {
    return push_rows(query_database("SELECT * FROM `chatroom_auth` WHERE `id` = ?",
                    array($chatroom_id),
                    "i",
                    $retrieve=true));
}

function delete_chatroom_auth_token(string $token): void {
    query_database("DELETE FROM `chatroom_auth` WHERE `chatroom_connection` = ?",
                array($token),
                "s");
}

function delete_chatroom_auth_token_with_chatroom($chatroom_id) {
    query_database("DELETE FROM `chatroom_auth` WHERE `id` = ?",
                    array($chatroom_id),
                    "i");
}

function delete_chatroom_auth_token_by_user(int $user_id): void {
    query_database("DELETE FROM `chatroom_auth` WHERE `user` = ?",
                array($user_id),
                "i");
}

function delete_chatroom_with_id(int $chatroom_id) {
    query_database("DELETE from `chatroom_data` WHERE `id` = ?",
                    array($chatroom_id),
                    "i");
}

function set_chatroom_tokens(int $token_num, int $chatroom_id): void {
    query_database("UPDATE `chatroom_data` SET `available` = ? WHERE `id` = ?",
                array($token_num, $chatroom_id),
                "ii");
}

function set_chatroom_location(float $long, float $lat, int $chatroom_id): void {
    query_database("UPDATE `chatroom_data` SET `longitude` = ?, `latitude` = ? WHERE `id` = ?",
                    array($long, $lat, $chatroom_id),
                    "ddi");
}

function get_text_with_chatroom_id(int $chatroom_id): array {
    return push_rows(query_database("SELECT * FROM `text_data` WHERE `chatroom` = ?",
                                    array($chatroom_id),
                                    "i",
                                    $retrieve=true),true);
}

function create_new_text_message(int $chatroom_id, string $user, int $user_id, string $content): void {
    query_database("INSERT INTO `text_data` (`chatroom`,`user`,`user_id`,`content`) VALUES (?,?,?,?)",
                array($chatroom_id,$user,$user_id,$content),
                "isis");
}   

function delete_text_with_chatroom($chatroom_id) {
    query_database("DELETE from `text_data` WHERE `chatroom` = ?",
                    array($chatroom_id),
                    "i");
}

function create_friend_request(int $user_s_id, string $user_s_name, int $user_r_id, string $user_r_name) {
    query_database("INSERT INTO `social_network_data` (`user_s_id`,`user_s_name`,`user_r_id`,`user_r_name`, `status`) VALUES (?,?,?,?,0)",
                    array($user_s_id,$user_s_name, $user_r_id, $user_r_name),
                    "isis");
}

function accept_friend_request(int $user_s_id, int $user_r_id) {
    query_database("UPDATE `social_network_data` SET `status` = 1 WHERE `user_s_id` = ? AND `user_r_id` = ?",
                    array($user_s_id, $user_r_id),
                    "ii");
}

function reject_friend_request(int $user_s_id, int $user_r_id) {
    query_database("DELETE FROM `social_network_data` WHERE `user_s_id` = ? AND `user_r_id` = ?",
                    array($user_s_id,$user_r_id),
                    "ii");
}

function remove_friend(int $user_s_id, int $user_r_id) {
    query_database("DELETE FROM `social_network_data` WHERE `user_s_id` = ? AND `user_r_id` = ?",
                    array($user_s_id,$user_r_id),
                    "ii");
    query_database("DELETE FROM `social_network_data` WHERE `user_r_id` = ? AND `user_s_id` = ?",
                    array($user_r_id,$user_s_id),
                    "ii");
}

function get_friend_data_with_id(int $user_id) {
    return push_rows(query_database("SELECT * FROM `social_network_data` WHERE `user_s_id` = ? OR `user_r_id` = ?",
                                    array($user_id,$user_id),
                                    "ii",
                                    $retrieve=true),true);
}

function check_outgoing_friend_request(int $user_id, int $target_id) {
    return push_rows(query_database("SELECT * FROM `social_network_data` WHERE `user_s_id` = ? AND `user_r_id` = ?",
                                    array($user_id, $target_id),
                                    "ii",
                                    $retrieve=true),true);
}

function check_incoming_friend_request(int $user_id, int $target_id) {
    return push_rows(query_database("SELECT * FROM `social_network_data` WHERE `user_r_id` = ? AND `user_s_id` = ?",
                                    array($user_id, $target_id),
                                    "ii",
                                    $retrieve=true),true);
}
function create_new_error_log(int $error_code, string $error_message, int $user, string $remote_addr) {
    return query_database("INSERT INTO `error_log` (`error_code`,`error_message`,`user`,`remote_addr`) VALUES (?,?,?,?)",
                        array($error_code,$error_message,$user,$remote_addr),
                        "isis");
}