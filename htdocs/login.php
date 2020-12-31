<!DOCTYPE html>
<html>
<head>
    <title>Capture the flag</title>
    <link rel="stylesheet" href="style/main.css">
    <script src="js/introduction.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/validateForm.js"></script>
</head>
<body>
<div class="content">

    <img src="style/images/flags-logo.png" width="80%" alt="Banner">

    <h1 class="title">Capture the flag</h1>

    <form class="input-form" name="play-form" action="game/" onsubmit="return validateForm()" method="post">
    
        <label class="input-name" for="name">Nickname</label>
        <input type="text" id="name" name="name" autocomplete="off"></input>

        
        <label class="input-name" for="password">Password</label>
        <input type="password" id="password" name="password" autocomplete="off"></input>

		<button class="play-button" type="submit">Login</button>
    </form>

    <p id="error" class="error-message"></p>
    
    <div class="link">
        <a href="./register.php" class="link">Registration</a>
    </div>

</div>

<div class="bottom-text">
    <p>Copyright © George Sikora 2020</p>
</div>

</body>
</html>

<?php if(isset($_GET['error'])) { ?>
    <script>
        $('#error').html('<?php echo($_GET["message"]."<br>Error: ".$_GET["error"]); ?>');
    </script>
<?php } ?>