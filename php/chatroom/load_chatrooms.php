<?php
include "../auth/utility.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // check if user has connection
    $result = $connection->query("SELECT * FROM `chatroom_data`");

    $rows = array();
    while($row = $result->fetch_assoc()) {
        array_push($rows, json_encode($row));
    }
    echo json_encode($rows);
} else {
    forbidden_response();
}
