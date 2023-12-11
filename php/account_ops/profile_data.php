<?php
include '../auth/utility.php';

handle_login_state();
echo json_encode(get_user_with_sid($_COOKIE['PHPSESSID'])[0]);