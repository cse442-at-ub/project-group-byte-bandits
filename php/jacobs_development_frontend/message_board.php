<?php
include "../auth/utility.php";
handle_login_state();
?>
<body onload="load_content()">
    <div id='content'></div>
    <div>
    <input id="text_input" placeholder="enter message" type="text"/>
    <button onclick="post_message()"> send </button>
    <script type="text/javascript" src="functions.js"></script>
    <a href="../auth/logout">logout</a>
    <a href="../chatroom/disconnect_chatroom">disconnect</a>
    </div>
</body>