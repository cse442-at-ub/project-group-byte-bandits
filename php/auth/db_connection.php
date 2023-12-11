<?php
$connection = new mysqli("oceanus.cse.buffalo.edu", 'jderosa3', 'byte-bandits','cse442_2023_fall_team_a_db');
if($connection->connect_error)
    die("connection failed: " . $connection->connect_error);