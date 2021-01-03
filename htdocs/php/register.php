
<div class="content">

    <img src="style/images/flags-logo.png" width="80%" alt="Banner">

    <h1 class="title">Capture the flag</h1>

    <form class="input-form" name="play-form" action="php/registerGate" onsubmit="return validateForm(this)" method="post">
    
        <label class="input-name" for="nickname">Nickname <span style="color:red">*</span></label>
        <input class="text-input" type="text" id="nickname" onkeypress="return event.charCode != 32" name="nickname" spellcheck="false" autocomplete="off"></input>

        <label class="input-name" for="password">Enter password <span style="color:red">*</span></label>
        <input class="text-input" type="password" id="password" name="password"></input>
        
        <input type="hidden" name="hashpswrd" id="hashpswrd" value=""></input>

        <label class="input-name" for="token">Starter pack token</label>
        <input class="text-input" id="token-input" onkeypress="return event.charCode != 32" maxlength="12" style="text-transform:uppercase" type="text" id="token" name="token" autocomplete="off"></input>

        <div class="confirm-check">
            <input type="checkbox" id="confirm" name="confirm"></input>
            <label for="confirm">I agree with the <a style="color:#bbf" href="/rules" target="_blank">game rules</a></label>
        </div>

		<button class="play-button" type="submit">Register</button>
    </form>

    <p id="error" class="error-message"></p>
    
    <div class="links">
        <a href="login">Login</a>
    </div>

</div>

<?php if(isset($_GET['error'])) { ?>
    <script>
        $('#error').html('<?php echo($_GET["message"]."<br>Error: ".$_GET["error"]); ?>');
    </script>
<?php } ?>