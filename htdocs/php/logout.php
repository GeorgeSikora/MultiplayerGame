<?php

    session_start();
    session_destroy();

    setcookie("name", null, time()-3600, "/");
    setcookie("hashpswrd", null, time()-3600, "/");

    header("location: /");

?>