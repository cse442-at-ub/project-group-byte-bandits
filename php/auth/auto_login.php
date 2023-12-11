<?php
include "utility.php";

login_token_forwarding();
$rows = get_user_with_login_token($_COOKIE['login_token']);
$new_session_id = session_create_id('session-');
session_id($new_session_id);
reset_user_session_id($new_session_id, $rows[0]['id']);
session_start();