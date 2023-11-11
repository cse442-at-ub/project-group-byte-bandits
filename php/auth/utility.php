<?php
$connection = new mysqli("oceanus.cse.buffalo.edu", 'jderosa3', 'byte-bandits','cse442_2023_fall_team_a_db');
if($connection->connect_error)
    die("connection failed: " . $connection->connect_error);

$lifespan = 3600*24;    # 1 day

function validate_csrf_token():void {
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
    $message = "Caught exception: ". $e->getMessage()." ". $errc[$type];
    echo json_encode(["response" => $message]);
    exit($errc[$type]);
}

function forbidden_response():void {
    http_response_code(403);
    echo "<h1>access not permitted!! (╯°□°）╯︵ ┻━┻</h1>";
}

function check_post_record($post):void {
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

class user_queries {
    function create_new_user(string $uname, 
                            string $password, 
                            string $email, 
                            string $session_id): void {
        query_database("INSERT INTO `user_data` (`name`,`password`,`email`,`session`)  VALUES(?,?,?,?)",
                    array($uname,$password,$email,$session_id),
                    "ssss");
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
    
    function set_user_password(string $new_password, string $session_id): void {
        query_database("UPDATE `user_data` SET `password` = ? WHERE `session` = ?",
                    array($new_password, $session_id),
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

    function set_user_location(string $location, string $session_id): void {
        query_database("UPDATE `user_data` SET `location` = ? WHERE `session` = ?",
                    array($location, $session_id),
                    "ss");
    }
    
    function delete_user(string $session_id): void {
        query_database("DELETE FROM `user_data` WHERE `session` = ?",
                    array($session_id),
                    "s");
    }
}

class chatroom_queries {
    function create_new_chatroom(int $id, int $radius, string $location, int $host, int $tokens): void {
        query_database("INSERT INTO `chatroom_data` (`id`,`radius`,`location`,`host`,`max_persons`) VALUES (?,?,?,?,?)",
                    array($id,$radius,$location,$host,$tokens),
                    "iisii");
    }

    function get_chatroom_with_id(int $chatroom_id): array {
        return push_rows(query_database("SELECT * FROM `chatroom_data` WHERE `id` = ?",
                        array($chatroom_id),
                        "i",
                        $retrieve=true));
    }

    function get_chatroom_with_host(int $host): array {
        return push_rows(query_database("SELECT * FROM `chatroom_data` WHERE `id` = ?",
                        array($host),
                        "i",
                        $retrieve=true));
    }

    function create_chatroom_token(int $chatroom_id, string $token, string $session_id, int $user): void {
        query_database("INSERT INTO `chatroom_auth` (`id`,`token`,`session`, `user`) VALUES (?,?,?,?)",
                    array($chatroom_id,$token,$session_id,$user),
                    "issi");
    }

    function get_chatroom_auth_with_token(string $token, string $session_id): array {
        return push_rows(query_database("SELECT * FROM `chatroom_auth` WHERE `token` = ? AND `session` = ?",
                        array($token, $session_id),
                        "ss",
                        $retrieve=true));
    }

    function delete_chatroom_auth_token(string $session_id): void {
        query_database("DELETE FROM `chatroom_auth` WHERE `session` = ?",
                    array($session_id),
                    "s");
    }

    function set_chatroom_tokens(int $token_num, int $chatroom_id): void {
        query_database("UPDATE `chatroom_data` SET `max_persons` = ? WHERE `id` = ?",
                    array($token_num, $chatroom_id),
                    "ii");
    }
}

class text_queries {
    function get_text_with_chatroom_id(int $chatroom_id): array {
        return push_rows(query_database("SELECT * FROM `text_data` WHERE `chatroom` = ?",
                                       array($chatroom_id),
                                       "i",
                                       $retrieve=true),true);
    }
    
    function create_new_text_message(int $chatroom_id, string $user, string $content): void {
        query_database("INSERT INTO `text_data` (`chatroom`,`user`,`content`) VALUES (?,?,?)",
                    array($chatroom_id,$user,$content),
                    "iss");
    }   
}

function create_new_error_log(int $error_code, string $error_message, int $user, string $remote_addr) {
    return query_database("INSERT INTO `error_log` (`error_code`,`error_message`,`user`,`remote_addr`) VALUES (?,?,?,?)",
                        array($error_code,$error_message,$user,$remote_addr),
                        "isis");
}

$userQuery = new user_queries();
$chatroomQuery = new chatroom_queries();
$textQuery = new text_queries();

function handle_login_state():void {
    try {
        if(!isset($_COOKIE['PHPSESSID']))
            throw new Exception("no cookie");
        else
            $rows = $userQuery->get_user_with_name('admin');
            echo $rows[0];
            //if(count($rows) == 0) {
            //    throw new Exception("no database record not logged in");
            //}
    } catch( Exception $e) {
        handle_exception($e, 'cookies');
    }
}