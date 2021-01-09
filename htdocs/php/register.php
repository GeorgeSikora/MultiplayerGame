
<div class="content">

    <img src="style/images/flags-logo.png" width="80%" alt="Banner">

    <h1 class="title">Capture the flag</h1>

    <div class="input-form" id="register-form">
    
        <label class="input-name" for="nickname">Nickname <span style="color:red">*</span></label>
        <input class="text-input" type="text" id="nickname" onkeypress="return event.charCode != 32" name="nickname" spellcheck="false" autocomplete="off"></input>

        <label class="input-name" for="password">Enter password <span style="color:red">*</span></label>
        <input class="text-input" type="password" id="password" name="password"></input>
        
        <input type="hidden" name="hashpswrd" id="hashpswrd" value=""></input>

        <label class="input-name" for="token">Starter pack token</label>
        <input class="text-input" id="token" onkeypress="return event.charCode != 32" maxlength="12" style="text-transform:uppercase" type="text" name="token" autocomplete="off"></input>

        <div class="confirm-check">
            <input type="checkbox" id="confirm" name="confirm"></input>
            <label for="confirm">I agree with the <a style="color:#bbf" href="/rules" target="_blank">game rules</a></label>
        </div>

		<button class="play-button" id="register-button" onclick="if(validateRegisterForm()) sendRegistration()">Register</button> <!-- type="submit" -->
    </div>

    <p id="error" class="error-message"></p>
    
    <div class="links">
        <a href="login">Login</a>
    </div>

</div>

<script>

document.addEventListener("keydown", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("register-button").click();
  }
});

function sendRegistration() {
    request = $.ajax({
        url: "/php/registerGate",
        type: "post",
        data: {
            nickname: $('#nickname').val(),
            hashpswrd: $('#hashpswrd').val(),
            token: $('#token').val(),
            confirm: $('#confirm').is(':checked')
        },
        success: function(result) {
            if (result) {
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