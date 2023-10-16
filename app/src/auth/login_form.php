<?php
include "utility.php";
session_start();
if(session_status() === 2) {
    if($session_id = $_COOKIE['PHPSESSID']) {
        $result = $connection->query("SELECT * FROM `user_data` WHERE `session` = '$session_id'");
        if($result->fetch_assoc())
            header("Location: ../send_messages/send_xhr");
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