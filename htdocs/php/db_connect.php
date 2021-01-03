<?php

$mysqli = mysqli_connect('localhost', 'root', '', 'multiplayergame');

/* check connection */
if (mysqli_connect_errno()) {
    header('location: /error/db/' . mysqli_connect_errno());
    return;
}

?>