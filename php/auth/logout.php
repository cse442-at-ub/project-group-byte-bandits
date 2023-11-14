<?php
include "../auth/utility.php";

handle_login_state();
unset_chatroom_connection($session_id);
delete_chatroom_auth_token($session_id);
unset_user_login_token($session_id);
unset_session_id($session_id);
setcookie("login_token", '', time() - $GLOBALS['lifespan'],'/');
session_destroy();