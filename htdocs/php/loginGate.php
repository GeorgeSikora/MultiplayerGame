<?php

// sending errors to db
define("enable_error_sending", true);

if (!isset($_POST['nickname'])) sendError('login', 'Name is not set!');
if (!isset($_POST['hashpswrd'])) sendError('login', 'Password is not set!');

$name = $_POST['nickname'];
$password = $_POST['hashpswrd'];

// nickname check
if (strlen($name) < 3) sendError('login', 'nickname obsahuje nepovolené znaky');
if (strlen($name) > 25) sendError('login', 'nickname obsahuje nepovolené znaky');
if (!preg_match('/^[a-zA-Z0-9_\s]*$/', $name)) sendError('login', 'nickname obsahuje nepovolené znaky');

// password check
if (strlen($password) != 64 && strlen($password) != 32) sendError('login', 'heslo nemá určitou délku pro hash');
if (!preg_match('/^[a-zA-Z0-9_\s]*$/', $password)) sendError('login', 'heslo obsahuje nepovolené znaky');

session_start();

if (!isUserExists($name)) exitError('Name is not existing!');
if (!isUserPasswordCorrect($name, $password)) exitError('Password is not correct!');
if (isUserConnected($name)) exitError('User already connected!');

// session vars for game
$_SESSION['name'] = $name;
$_SESSION['hashpswrd'] = $password;

setcookie("name", $name, time() + (360 * 86400 * 30), "/"); // 86400 = 1 day
setcookie("hashpswrd", $password, time() + (360 * 86400 * 30), "/"); // 86400 = 1 day

die();

// LOGIN SQL
// SELECT name, password FROM players WHERE name='Jurkos' AND password='0145d27b4e419b49063c2d9cfbf06177'

function isUserExists($name) {
    include('db/connect.php');
    $sql =  "SELECT count(*) AS total FROM players WHERE name='$name'";
    $result = $mysqli -> query($sql);
    $rows = mysqli_fetch_assoc($result)['total'];
    mysqli_close($mysqli);
    return $rows == 0 ? false : true;
}

function isUserPasswordCorrect($name, $password) {
    include('db/connect.php');
    $sql =  "SELECT count(*) AS total FROM players WHERE name='$name' AND password='$password'";
    $result = $mysqli -> query($sql);
    $rows = mysqli_fetch_assoc($result)['total'];
    mysqli_close($mysqli);
    return $rows == 0 ? false : true;
}

function isUserConnected($name) {
    include('db/connect.php');
    $sql =  "SELECT connected as status FROM players WHERE name='$name'";
    $result = $mysqli -> query($sql);
    $status = mysqli_fetch_assoc($result)['status'];
    mysqli_close($mysqli);
    return $status == 0 ? false : true;
}

// SELECT COUNT(*) as total FROM `errors` WHERE ip='::1' AND time >= DATE_SUB(NOW(), INTERVAL 1 HOUR);

function sendError($type, $desc) {
    if (!enable_error_sending) return;

    $ip = $_SERVER['REMOTE_ADDR'];

    include('db/connect.php');

    $sql =  "SELECT count(*) as total FROM errors WHERE ip='$ip' AND dateCreated >= DATE_SUB(NOW(), INTERVAL 1 HOUR)";
    $result = $mysqli -> query($sql);
    $rows = mysqli_fetch_assoc($result)['total'];

    if ($rows < 10) {
        $sql = "INSERT INTO errors (type, description, ip) VALUES ('$type', '$desc', '$ip')";
        $result = $mysqli->query($sql);
        exitError($rows . "#" . $desc);
    }
    mysqli_close($mysqli);
    exitError($desc);
}

function exitError($error) {
    if (session_status() == PHP_SESSION_ACTIVE) session_destroy();
    echo $error;
    die();
}

?>