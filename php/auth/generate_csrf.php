<?php
session_start();
if (isset($_SESSION['csrf_token'])) {
    unset($_SESSION['csrf_token']);
}

$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
$response = [ 'csrf_token' => $_SESSION['csrf_token']];
echo json_encode($response);