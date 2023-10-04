<?php
function check_post_record($post) {
    try {
        foreach($post as $p) {
            if (!$p) {
                throw new Exception('empty record');
            }
        }
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        exit(199);
    }
}