
<div class="content">

    <img src="style/images/flags-logo.png" width="80%" alt="Banner">

    <h1 class="title">Capture the flag</h1>

    <form class="input-form" name="play-form" action="game/" onsubmit="return validateForm()" method="post">
    
        <label class="input-name" for="name">Nickname</label>
        <input class="text-input" type="text" id="name" name="name" onkeypress="return event.charCode != 32" spellcheck="false" autocomplete="off"></input>
        
        <label class="input-name" for="password">Password</label>
        <input class="text-input" type="password" id="password" name="password"></input>

		<button class="play-button" type="submit">Login</button>
    </form>

    <p id="error" class="error-message"></p>
    
    <div class="links">
        <a href="./register">Registration</a>
    </div>

</div>

<?php if(isset($_GET['error'])) { ?>
    <script>
        $('#error').html('<?php echo($_GET["message"]."<br>Error: ".$_GET["error"]); ?>');
    </script>
<?php } ?>