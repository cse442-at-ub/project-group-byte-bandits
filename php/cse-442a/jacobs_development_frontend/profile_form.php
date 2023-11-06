<?php
include "../auth/utility.php";

$session_id = $_COOKIE['PHPSESSID'];
if($session_id) {
    $rows = get_user_with_sid($session_id);
    if (count($rows) > 0) {
        header("Location: ../chatroom/message_board"); 
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
</body>
</html>