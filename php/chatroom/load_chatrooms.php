<?php
include "../auth/utility.php";

handle_login_state();
$result = $connection->query("SELECT * FROM `chatroom_data`");

$rows = array();
while($row = $result->fetch_assoc()) {
    array_push($rows, json_encode($row));
}
echo json_encode($rows);
