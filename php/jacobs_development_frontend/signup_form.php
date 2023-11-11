<?php
include "../auth/utility.php";

$session_id = $_COOKIE['PHPSESSID'];
if($session_id) {
    $uq = new user_queries();
    $rows = $uq->get_user_with_sid($session_id);
    if (count($rows) > 0) {
        header("Location: ../chatroom/browser"); 
    }
}
?>
<html>
<body onload="signup_form()">
    <script type="text/javascript" src="functions.js"></script>
</body>
</html>