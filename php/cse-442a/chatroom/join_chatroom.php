<?php
include "../auth/utility.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    // check ssid
    $user_record = get_user_with_sid($_COOKIE['PHPSESSID'])[0];
    $chatroom_record = get_chatroom_with_id($id)[0];

    try {
        if(!$user_record['session'])
            throw new Exception('not logged in');
    } catch(Exception $e) {
        echo "Caught exception: ", $e->getMessage(),"\n";
        echo $errc["session"];
        exit($errc["session"]);
    }

    // check if they are already connected to a chatroom
    try {
        if($user_record['chatroom_connection'])
            throw new Exception('already connected to chatroom');
    } catch(Exception $e) {
        echo "Caught exception: ", $e->getMessage(),"\n";
        echo $errc["chatroom"];
        exit($errc["chatroom"]);
    }

    // check users location data
    function cartesian_distance($user,$chatroom) {
        $x_dist = $chatroom['long']-$user['long'];
        $y_dist = $chatroom['lat']-$user['lat'];
        return sqrt(pow($x_dist,2) + pow($y_dist,2));
    }

    try {
        $user_location = json_decode($user_record['location'], true);
        $chatroom_location = json_decode($chatroom_record['location'],true);
        $chatroom_rad = $chatroom_record['radius'];
        if(cartesian_distance($user_location,$chatroom_location) > $chatroom_rad)
            throw new Exception('out of chatroom range');

    } catch(Exception $e) {
        echo "Caught exception: ", $e->getMessage(),"\n";
        echo $errc["chatroom"];
        exit($errc["chatroom"]);
    }

    setcookie("chatroom",$id,time()+$GLOBALS['time_seconds'],'/');
    // generate new chatroom auth token
    $chatroom_token = bin2hex(random_bytes(16));
    create_chatroom_token($id, $chatroom_token, $_COOKIE['PHPSESSID']);
    set_user_chatroom_connection($chatroom_token, $_COOKIE['PHPSESSID']);
    set_chatroom_tokens($chatroom_record['tokens'] -1 , $id);
} else {
    echo "<h1>access not permitted!! (╯°□°）╯︵ ┻━┻</h1>";
}