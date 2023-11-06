<?php

include "utility.php";

echo $rows = get_user_with_name("admin")[0]['name'];
$pword_rehash = password_hash("1234", PASSWORD_BCRYPT);
reset_user_password($pword_rehash,"admin");
