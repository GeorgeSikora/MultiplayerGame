<?php

// display errors from php to page
define("enable_display_errors", true);
// sending errors to db
define("enable_error_sending", true);


if (enable_display_errors) {
    ini_set('display_errors', 0);
    error_reporting(E_ERROR | E_WARNING | E_PARSE); 
}

$nickname = $_POST['nickname'];
$hashpswrd = $_POST['hashpswrd'];
$confirm = $_POST['confirm'];

/*
echo '<pre>'.print_r($_POST,true).'</pre>';
echo 'nickname: '   . isset($nickname)  . '<br>';
echo 'password: '   . isset($hashpswrd) . '<br>';
echo 'confirm: '    . isset($confirm)   . '<br>';
*/

if (!isset($nickname)) sendError('registration', 'post nemá nickname');
if (!isset($hashpswrd)) sendError('registration', 'post nemá heslo');
if (!isset($confirm)) sendError('registration', 'post nemá potvrzený souhlas s pravidly');
if (!preg_match('/^[a-zA-Z0-9_\s]*$/', $nickname)) sendError('registration', 'nickname obsahuje nepovolené znaky');

echo 'Úspěch';
applyToken($token);

mysqli_close($mysqli);

/* send variables to session for the game */
session_start(); 

$_SESSION['name'] = $nickname;
$_SESSION['password'] = $hashpswrd;

header('location: /game');

function sendError($type, $desc) {
    if (!enable_error_sending) return;
    include('db_connect.php');
    $ip = $_SERVER['REMOTE_ADDR'];
    $sql = "INSERT INTO errors (Type, Description, Ip) VALUES ('$type', '$desc', '$ip')";
    $result = $mysqli->query($sql);
    if ($result === TRUE) {
        header('location: /error/'.$type); // ERROR inserted to db
    } else {
        header('location: /error/db/9901'); // Cannot insert ERROR to db
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