<?php
include "../auth/utility.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // check if user has connection
    $query = "SELECT * FROM `chatroom_data`";
    $result = $connection->query($query);

    $rows = array();
    while($row = $result->fetch_assoc()) {
        array_push($rows, json_encode($row));
    }
    echo json_encode($rows);
}
