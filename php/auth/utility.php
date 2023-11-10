<?php
$connection = new mysqli("oceanus.cse.buffalo.edu", 'jderosa3', 'byte-bandits','jderosa3_db');
if($connection->connect_error)
    die("connection failed: " . $connection->connect_error);

$time_seconds = 3600*24;    # 1 day
$errc = array(
    'form' => 197,
    'cookies' => 150,
    'sql' => -1,
    'session' => 99);

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

function sql_retrieve_rows($sql, $params = array(), $connection) {
    try {
        $stmt = $connection->prepare($sql);
        if (!$stmt)
            throw new Exception("failed to prepare query");
        foreach ($params as $p) {
            if(!$stmt->bind_param("s", $p))
                throw new Exception("failed to bind params");
        }
        if(!mysqli_stmt_execute($stmt))
            throw new Exception("failed to execute query");        
        if(!$result = mysqli_stmt_get_result($stmt))
            throw new Exception("failed to retrieve result");
        $rows = array();
        while($row = $result->fetch_assoc()) {
            array_push($rows, $row);
        }
    } catch (Exception $e) {
        echo "Caught exception: ", $e->getMessage(),"\n";
        exit($errc["sql"]);
    }
    return $rows;
}

// CRUD OPERATIONS /////////////////////////////////////////////////////////////////

function get_with_sid($session_id,$connection) {
    $query = "SELECT * FROM `user_data` WHERE `session` = ?";
    return sql_retrieve_rows($query, array($session_id),$connection);
}

function get_with_name($uname, $connection) {
    $sql = "SELECT * FROM `user_data` WHERE `name` = ?";
    return sql_retrieve_rows($sql, array($uname), $connection);
}

function get_with_email($email, $connection) {
    $sql = "SELECT * FROM `user_data` WHERE `email` = ?";
    return sql_retrieve_rows($sql, array($email), $connection);
}   

function reset_password( $old_password, $new_password, $session_id, $connection) {
    $sql = "UPDATE `user_data` SET `password` = ? WHERE `password` = ?";
    if($session_id) {
        $sql = "UPDATE `user_data` SET `password` = ? WHERE `password` = ? AND `session` = ?";
    }
    try {
        $stmt = $connection->prepare($sql);
        if($session_id) {
            $stmt->bind_param("sss", $new_password,$old_password,$session_id);
        } else {
            $stmt->bind_param("ss", $new_password,$old_password);
        }
        if(!mysqli_stmt_execute($stmt))
            throw new Exception("failed to execute query");
    } catch (Exception $e) {
        echo "Caught exception: ", $e->getMessage(),"\n";
        exit($errc["sql"]);
    }
}

function reset_username($uname, $session_id, $connection) {
    $sql = "UPDATE `user_data` SET `name` = ? WHERE `session` = ?";
    try {
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("ss", $uname,$session_id);
        if(!mysqli_stmt_execute($stmt))
            throw new Exception("failed to execute query");
    } catch (Exception $e) {
        echo "Caught exception: ", $e->getMessage(),"\n";
        exit($errc["sql"]);
    }
}

function reset_email($email, $session_id, $connection) {
    $sql = "UPDATE `user_data` SET `email` = ? WHERE `session` = ?";
    try {
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("ss", $email,$session_id);
        if(!mysqli_stmt_execute($stmt))
            throw new Exception("failed to execute query");
    } catch (Exception $e) {
        echo "Caught exception: ", $e->getMessage(),"\n";
        exit($errc["sql"]);
    }
}

function reset_session_id( $session_id, $uname, 
                           $connection) {
    $sql = "UPDATE `user_data` SET `session` = ? WHERE `name` = ?";
    try {
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("ss", $session_id,$uname);
        if(!mysqli_stmt_execute($stmt))
            throw new Exception("failed to execute query");
    } catch (Exception $e) {
        echo "Caught exception: ", $e->getMessage(),"\n";
        exit($errc["sql"]);
    }
}

function unset_session_id( $session_id, $connection) {
    $sql = "UPDATE `user_data` SET `session` = '' WHERE `session` = ?";
    try {
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("s", $session_id);
        if(!mysqli_stmt_execute($stmt))
            throw new Exception("failed to execute query");
    } catch (Exception $e) {
        echo "Caught exception: ", $e->getMessage(),"\n";
        exit($errc["sql"]);
    }
}

function create_new_user($uname, 
                         $password, 
                         $email, 
                         $session_id,
                         $connection) {
    $sql="INSERT INTO `user_data` (`name`,`password`,`email`,`session`)  VALUES(?,?,?,?)";
    try {
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("ssss", $uname,$password,$email,$session_id);
        if(!mysqli_stmt_execute($stmt))
            throw new Exception("failed to execute query");

    } catch (Exception $e) {
        echo "Caught exception: ", $e->getMessage(),"\n";
        exit($errc["sql"]);
    }
}
function delete_user($session_id, $connection) {
    $sql = "DELETE FROM `user_data`WHERE `session` = ?";
    try {
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("s", $session_id);
        if(!mysqli_stmt_execute($stmt))
            throw new Exception("failed to execute query");
    } catch (Exception $e) {
        echo "Caught exception: ", $e->getMessage(),"\n";
        exit($errc["sql"]);
    }
}