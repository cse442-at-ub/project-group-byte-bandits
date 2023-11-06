<?php
include "../auth/utility.php";
if(!$session_id = $_COOKIE['PHPSESSID'])
    header("Location: ../auth/login_form");
$rows = get_user_with_sid($session_id);
if(count($rows) === 0)
    header("Location: ../auth/login_form");

?>
<body onload="load_chatrooms()">
<script type="text/javascript" src="functions.js"></script>

</body>