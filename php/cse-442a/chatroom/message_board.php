<?php
include "../auth/utility.php";
$session_id = $_COOKIE['PHPSESSID'];
$rows = get_user_with_sid($session_id);
if(count($rows) === 0)
    header("Location: ../auth/login_form");

?>
<body onload="load_content()">
    <div id='content'></div>
    <div>
    <input id="text_input" placeholder="enter message" type="text"/>
    <button onclick="post_message()"> send </button>
    <script type="text/javascript" src="functions.js"></script>
    <a href="../auth/logout">logout</a>
    <a href="disconnect_chatroom">disconnect</a>
    </div>
</body>