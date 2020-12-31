
<link rel="icon" type="image/ico" href="style/favicon.ico"/>

<?php

// Include router class
include('Route.php');

// Add base route (startpage)
Route::add('/',function(){
  echo 'Routered from /';
	include('login.php');
});

Route::add('/play',function(){
  echo 'Routered from /play';
	include('login.php');
});

Route::add('/login',function(){
  echo 'Routered from /login';
	include('login.php');
});

Route::add('/test.html',function(){
  echo 'Hello from test.html';
});

// Post route example
Route::add('/contact-form',function(){
    echo 'xddd<form method="post"><input type="text" name="test" /><input type="submit" value="send" /></form>';
},'get');

// Post route example
Route::add('/contact-form',function(){
    echo 'Hey! The form has been sent:<br/>';
    print_r($_POST);
},'post');

// Accept only numbers as parameter. Other characters will result in a 404 error
Route::add('/foo/([0-9]*)/bar/([0-9]*)',function($var1, $var2){
    echo $var1.' is a great number! and also '.$var2;
});

Route::run('/');

?>