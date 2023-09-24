<?php
$connection = new mysqli("oceanus.cse.buffalo.edu", 'jderosa3', 'byte-bandits','jderosa3_db');
if($connection->connect_error)
    die("connection failed: " . $connection->connect_error);