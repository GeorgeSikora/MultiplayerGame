<?php

include('functions.php');

// [TODO]: Add base route (startpage)

Route::add('/',function(){
    increaseStatistic('page_entry');
    header('location: /login');
});

Route::add('/home',function(){
    header('location: /login');
});

Route::add('/rules',function(){
    include('php/rules.php');
});

Route::add('/login',function(){
    include('php/login.php');
});

Route::add('/register',function(){
    include('php/register.php');
});

/* ERRORS */
Route::add('/error/registration',function(){
    include('php/errors/registration.php');
});
Route::add('/error/db/([0-9]*)',function($error){
    include('php/errors/db.php');
});




/* TESTS, TESTS.... TESTS */

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