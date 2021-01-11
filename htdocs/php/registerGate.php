<?php

// display errors from php to page
define("enable_display_errors", true);
// sending errors to db
define("enable_error_sending", true);

if (enable_display_errors) {
    ini_set('display_errors', 0);
    error_reporting(E_ERROR | E_WARNING | E_PARSE); 
}

// post values
$nickname   = $_POST['nickname'];
$hashpswrd  = $_POST['hashpswrd'];
$token      = $_POST['token'];
$confirm    = $_POST['confirm'];

// check if values setted
if (!isset($nickname)) sendError('registration', 'post nemá nickname');
if (!isset($hashpswrd)) sendError('registration', 'post nemá heslo');
if (!isset($confirm)) sendError('registration', 'post nemá potvrzený souhlas s pravidly');

// nickname check
if (strlen($nickname) < 3) sendError('registration', 'nickname obsahuje nepovolené znaky');
if (strlen($nickname) > 25) sendError('registration', 'nickname obsahuje nepovolené znaky');
if (!preg_match('/^[a-zA-Z0-9_\s]*$/', $nickname)) sendError('registration', 'nickname obsahuje nepovolené znaky');

// password check
if (strlen($hashpswrd) != 64 && strlen($hashpswrd) != 32) sendError('registration', 'heslo nemá určitou délku pro hash');
if (!preg_match('/^[a-zA-Z0-9_\s]*$/', $hashpswrd)) sendError('registration', 'heslo obsahuje nepovolené znaky');

// check if name already exists
include('db/connect.php');
$sql = "SELECT name FROM players WHERE name='$nickname'";
$result = $mysqli -> query($sql);
$count = mysqli_num_rows($result);
if ($count != 0) {
    session_start();
    $_SESSION['err'] = 'Jméno již existuje!';
    echo 'Name already exists!';
    mysqli_close($mysqli);
    die();
}
mysqli_close($mysqli);

// register player
include('db/connect.php');
$ip = $_SERVER['REMOTE_ADDR'];
$sql = "INSERT INTO players (name, password, token, ip) VALUES ('$nickname', '$hashpswrd', '$token', '$ip')";
$result = $mysqli->query($sql);
$id = mysqli_insert_id($mysqli);
applyToken($token, $id);
mysqli_close($mysqli);

// session vars & coockies for game
session_start();
$_SESSION['name']   = $nickname;
$_SESSION['hashpswrd']  = $hashpswrd;
setcookie("name", $name, time() + (360 * 86400 * 30), "/"); // 86400 = 1 day
setcookie("hashpswrd", $password, time() + (360 * 86400 * 30), "/"); // 86400 = 1 day

die();

/********************
    OWN FUNCTIONS
********************/

function sendError($type, $desc) {
    if (!enable_error_sending) die();
    include('db/connect.php');
    $ip = $_SERVER['REMOTE_ADDR'];
    $sql = "INSERT INTO errors (type, description, ip) VALUES ('$type', '$desc', '$ip')";
    $result = $mysqli->query($sql);
    if ($result === TRUE) {
        echo $desc;
    } else {
        echo 'Database fatal error.';
    }
    mysqli_close($mysqli);
    die();
}

function applyToken($token, $id) {
    if (isset($token)) {
        if ($token == "") return;

        $token = strtoupper($token);

        // UPDATE players SET coins=coins+100 WHERE id=1

        switch($token) {
            case "JUREK": // JURKUV KOUZELNÝ TOKEN !
                
                include('db/connect.php');
                $sql = "UPDATE players SET tokenUsed=1, coins=coins+1000 WHERE id='$id'";
                $result = $mysqli->query($sql);
                if ($result !== TRUE) echo 'Token error with database!';
                mysqli_close($mysqli);
                
                return;
            case "MOSTOR":
                
                include('db/connect.php');
                $sql = "UPDATE players SET tokenUsed=1, coins=coins+100 WHERE id='$id'";
                $result = $mysqli->query($sql);
                if ($result !== TRUE) echo 'Token error with database!';
                mysqli_close($mysqli);
                
                return;
            case "BUBAK":
            
                include('db/connect.php');
                $sql = "UPDATE players SET tokenUsed=1, coins=coins+50 WHERE id='$id'";
                $result = $mysqli->query($sql);
                if ($result !== TRUE) echo 'Token error with database!';
                mysqli_close($mysqli);
                
                return;
        }
    }
}

?>