<?php

// display errors from php to page
define("enable_display_errors", true);
// sending errors to db
define("enable_error_sending", true);

if (enable_display_errors) {
    ini_set('display_errors', 0);
    error_reporting(E_ERROR | E_WARNING | E_PARSE); 
}

/* MAIN PROGRAM */

// get post values
$nickname   = $_POST['nickname'];
$hashpswrd  = $_POST['hashpswrd'];
$confirm    = $_POST['confirm'];

/*
echo '<pre>'.print_r($_POST,true).'</pre>';
echo 'nickname: '   . isset($nickname)  . '<br>';
echo 'password: '   . isset($hashpswrd) . '<br>';
echo 'confirm: '    . isset($confirm)   . '<br>';
*/

// check variables
if (!isset($nickname)) sendError('registration', 'post nemá nickname');
if (!isset($hashpswrd)) sendError('registration', 'post nemá heslo');
if (!isset($confirm)) sendError('registration', 'post nemá potvrzený souhlas s pravidly');

//if (strlen($hashpswrd) < 8) sendError('registration', 'nickname obsahuje nepovolené znaky');
//if (strlen($hashpswrd) > 25) sendError('registration', 'nickname obsahuje nepovolené znaky');
//if (strlen($hashpswrd) != 32) sendError('registration', 'heslo nemá určitou délku pro md5 hash'); 
if (strlen($hashpswrd) != 64 && strlen($hashpswrd) != 32) sendError('registration', 'heslo nemá určitou délku pro sha256 hash');

if (strlen($nickname) < 3) sendError('registration', 'nickname obsahuje nepovolené znaky');
if (strlen($nickname) > 25) sendError('registration', 'nickname obsahuje nepovolené znaky');
if (!preg_match('/^[a-zA-Z0-9_\s]*$/', $nickname)) sendError('registration', 'nickname obsahuje nepovolené znaky');

// register player to db
include('db_connect.php');

$sql = "SELECT name FROM players WHERE name='$nickname'";
$result = $mysqli -> query($sql);
$count = mysqli_num_rows($result);

if ($count != 0) {
    session_start();
    $_SESSION['err'] = 'Jméno již existuje!';
    //header('location: /register');

    mysqli_close($mysqli);

    echo 'Name already exists!';
    die();
}

// exit db connection
/*
mysqli_close($mysqli);
die();
*/

// apply token
applyToken($token);

$sql = "INSERT INTO players (name, password) VALUES ('$nickname', '$hashpswrd')";
$result = $mysqli->query($sql);

if ($result === TRUE) {
    //echo 'ERROR 1!';
    //header('location: /error/'.$type); // Player sucsesfully registered
} else {
    echo 'ERROR 2!';
    //header('location: /error/db/9902'); // Cannot add player to db
}

// exit db connection
mysqli_close($mysqli);

// session vars for game
session_start();
$_SESSION['name']   = $nickname;
$_SESSION['hashpswrd']  = $hashpswrd;

// go to the game

//header('location: /game');
die();

/********************
    OWN FUNCTIONS
********************/

function sendError($type, $desc) {
    if (!enable_error_sending) return;
    include('db_connect.php');
    $ip = $_SERVER['REMOTE_ADDR'];
    $sql = "INSERT INTO errors (type, description, ip) VALUES ('$type', '$desc', '$ip')";
    $result = $mysqli->query($sql);
    if ($result === TRUE) {
        echo 'ERROR 3!';
        //header('location: /error/'.$type); // ERROR inserted to db
    } else {
        echo 'ERROR 4!';
        //header('location: /error/db/9901'); // Cannot insert ERROR to db
    }
    mysqli_close($mysqli);
    die();
}

function applyToken($token) {
    if (isset($token)) {
        if ($token == "") return;

        $token = strtoupper($token);
        echo 'Token: '. $token . '<br>';

        switch($token) {
            case "JUREK":
                echo 'Jurkuv kouzelný token<br>';
                break;
            default: 
                echo 'Neplatný token<br>';
                break;
        }
    }
}

?>