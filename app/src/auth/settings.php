<?php
$allowed_origin = '*';

// Set the header to allow the specified origin
header("Access-Control-Allow-Origin: $allowed_origin");

// Allow any credentials
header('Access-Control-Allow-Credentials: true');

// Specify the allowed methods
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

// Allowable headers when making the actual request
header('Access-Control-Allow-Headers: Content-Type, Authorization');

