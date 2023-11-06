<?php
include "../auth/utility.php";

$session_id = $_COOKIE['PHPSESSID'];
if($session_id) {
    $rows = get_user_with_sid($session_id);
    if (count($rows) > 0) {
        header("Location: ../chatroom/browser"); 
    }
}
?>
<html>
<body>
    <h1>DEMO SIGNUP FORM</h1>
    <form method="POST" action="validate_signup">
        <input name="username" type="text" placeholder="username"/>
        <br>
        <input name="password" type="password" placeholder="enter password"/>
        <br>
        <input name="password_check" type="password" placeholder="re-enter password"/>
        <br>
        <input name="email" type="text" placeholder="enter email"/>
        <br>
        <input type="submit" value="Sign up"/>
    </form>
</body>
</html>