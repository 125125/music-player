<?php
/*
####################################################################################################
###################################### DATABASE CONFIG #############################################
####################################################################################################
*/

$dbhost = "127.0.0.1";
$dbuser = "root";
$dbpass = "ascent";
$dbname = "musicplayer";
$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

$conn->set_charset("utf8mb4");

/*
####################################################################################################
################################### END DATABASE CONFIG ############################################
####################################################################################################
*/