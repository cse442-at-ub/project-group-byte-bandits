<?php
include "connect.php";
session_start();
echo $_COOKIE['session'];
if(session_status() === 2) {
    if($_COOKIE['session']) {
        $session_id = $_COOKIE['session'];
        echo $session_id;
        $result = $connection->query("SELECT * FROM `user_data` WHERE `session` = '$session_id'");
        $row = $result->fetch_assoc();
        echo sizeof($row);  
        if($row) {
            header("Location: ../xhr_demo/send_xhr");
        }
    }
}
?>
<html>
<body>
    <h1>DEMO LOGIN FORM</h1>
    <form method="POST" action="validate_login">
        <input name="username" type="text" placeholder="username"/>
        <br>
        <input name="password" type="password" placeholder="enter password"/>
        <br>
        <input type="submit" value="login"/>
    </form>
    <a href="../auth/logout.php">logout</a>
</body>
</html>