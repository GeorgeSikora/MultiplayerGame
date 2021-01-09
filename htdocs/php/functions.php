<?php

function increaseStatistic($name) {
    include('db/connect.php');
    $sql =  "UPDATE statistics SET count=count+1 WHERE name='$name'";
    $result = $mysqli -> query($sql);
    mysqli_close($mysqli);
}

?>