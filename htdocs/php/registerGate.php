<?php

function httpPost($url, $data) {
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}

/* Disable printing errors from php */
ini_set('display_errors', 0);
error_reporting(E_ERROR | E_WARNING | E_PARSE); 

$link = mysqli_connect('localhost:3306', 'root', '');

/* check connection */
if (mysqli_connect_errno()) {
    header('location: /error/db/' . mysqli_connect_errno());
    exit();
}

mysqli_close($link);

?>