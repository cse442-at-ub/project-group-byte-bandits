<?php
include "../auth/utility.php";

handle_login_state();
$user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
echo json_encode(get_friend_data_with_id($user_record['id']));