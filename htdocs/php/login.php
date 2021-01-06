
<div class="content">

    <img src="style/images/flags-logo.png" width="80%" alt="Banner">

    <h1 class="title">Capture the flag</h1>

    <div class="input-form" name="play-form" action="game/" method="post">
    
        <label class="input-name" for="name">Nickname</label>
        <input class="text-input" type="text" id="nickname" name="name" onkeypress="return event.charCode != 32" spellcheck="false" autocomplete="off"></input>
        
        <label class="input-name" for="password">Password</label>
        <input class="text-input" type="password" id="password" name="password"></input>
        
        <input type="hidden" name="hashpswrd" id="hashpswrd" value=""></input>
        
		<button class="play-button" id="login-button" type="submit" onclick="if(validateLoginForm()) sendLogin()">Login</button>
    </div>

    <p id="error" class="error-message"></p>
    
    <div class="links">
        <a href="./register">Registration</a>
    </div>

</div>


<script>

document.addEventListener("keydown", function(event) {
    console.log('Button pressed!');
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
                alert(result);
            } else {
                window.location.href = "/game";
            }
        }
    });
}
</script>


<?php if(isset($_GET['error'])) { ?>
    <script>
        $('#error').html('<?php echo($_GET["message"]."<br>Error: ".$_GET["error"]); ?>');
    </script>
<?php } ?>