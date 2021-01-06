<?php

$name = $_POST['nickname'];
$password = $_POST['hashpswrd'];

if (!isset($name)) exitError('Name is not set!');
if (!isset($password)) exitError('Name is not set!');

if (!isUserExists($name)) exitError('Name is not existing!');
if (!isUserPasswordCorrect($name, $password)) exitError('Password is not correct!');

// session vars for game
session_start();
$_SESSION['name'] = $name;
$_SESSION['hashpswrd'] = $password;

die();

// LOGIN SQL
// SELECT name, password FROM players WHERE name='Jurkos' AND password='0145d27b4e419b49063c2d9cfbf06177'

function isUserExists($name) {
    include('db_connect.php');
    $sql =  "SELECT count(*) AS total FROM players WHERE name='$name'";
    $result = $mysqli -> query($sql);
    $rows = mysqli_fetch_assoc($result)['total'];
    mysqli_close($mysqli);
    return $rows == 0 ? false : true;
}

function isUserPasswordCorrect($name, $password) {
    include('db_connect.php');
    $sql =  "SELECT count(*) AS total FROM players WHERE name='$name' AND password='$password'";
    $result = $mysqli -> query($sql);
    $rows = mysqli_fetch_assoc($result)['total'];
    mysqli_close($mysqli);
    return $rows == 0 ? false : true;
}

function exitError($error) {
    echo $error;
    die();
}

?>