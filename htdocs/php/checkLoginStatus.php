<?php

if (isset($_SESSION['name']) && isset($_SESSION['hashpswrd'])) {
    header('location: /game');
    die();
}

?>