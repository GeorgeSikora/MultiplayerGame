

<div class="content">

    <img src="style/images/flags-logo.png" width="80%" alt="Banner">

    <h1 class="title">Capture the flag</h1>

    <div class="input-form" name="play-form" action="game/" method="post">
    
        <label class="input-name" for="name">Nickname</label>
        <input class="text-input" type="text" id="nickname" name="name" onkeypress="return event.charCode != 32" spellcheck="false" autocomplete="off"></input>

        <label class="input-name" for="password">Password</label>
        <input class="text-input" type="password" id="password" name="password"></input>
        
        <input type="hidden" name="hashpswrd" id="hashpswrd" value=""></input>
        
		<button class="play-button" id="login-button" type="submit" onclick="if(validateLoginForm())sendLogin()">Login</button>
    </div>

    <p id="error" class="error-message"></p>
    
    <div class="links">
        <a href="./register">Registration</a>
    </div>

</div>


<script>

var coockieAuth = false;

document.addEventListener("keydown", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("login-button").click();
  }
});

function sendLogin() {
    request = $.ajax({
        url: "/php/loginGate",
        type: "post",
        data: {
            nickname: $('#nickname').val(),
            hashpswrd: $('#hashpswrd').val()
        },
        success: function(result) {
            if (result) {
                if (coockieAuth) window.location.href = "/php/logout.php";
                showError(result);
            } else {
                window.location.href = "/game";
            }
        }
    });
}

function showError(err) {
    $('#error').html(err);
    $('#error').show();
    $('#error').effect("shake", {times: 2, distance: 10}, 300);
}

</script>

<?php


// check coockie
if (isset($_COOKIE["name"]) && isset($_COOKIE["hashpswrd"])) {
    ?>
    <script>
        $('#nickname').val('<?php echo $_COOKIE["name"] ?>');
        $('#hashpswrd').val('<?php echo $_COOKIE["hashpswrd"] ?>');
        coockieAuth = true;
        sendLogin();
    </script>
    <?php
}


// check session
session_start();
require('checkLoginStatus.php');

if (isset($_SESSION['err'])) 
{
    ?>
        <script>
        $('#error').html('<?php echo $_SESSION["err"] ?>');
        $('#error').show();
        $('#error').effect("shake", {times: 2, distance: 10}, 300);
        </script>
    <?php 
    unset($_SESSION['err']);
}

?>

