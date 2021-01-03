<?php


// Add base route (startpage)
Route::add('/',function(){
    echo 'Routered from /';
    header('location: /login');
});

Route::add('/home',function(){
    echo 'Routered from /home';
    header('location: /login');
});

Route::add('/play',function(){
    echo 'Routered from /play';
    include('php/login.php');
});

Route::add('/rules',function(){
    echo 'Routered from /rules';
    include('php/rules.php');
});

Route::add('/register',function(){
    echo 'Routered from /register';
    include('php/register.php');
});

Route::add('/login',function(){
  echo 'Routered from /login';
  include('php/login.php');
});

Route::add('/test.html',function(){
  echo 'Hello from test.html';
});

Route::add('/error/registration',function(){
    include('php/error_registration.php');
});


Route::add('/error/db/([0-9]*)',function($error){
    include('php/error_db.php');
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