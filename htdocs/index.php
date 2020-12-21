<!DOCTYPE html>
<html>
<head>
    <title>Capture the flag</title>
    <link rel="stylesheet" href="style/main.css">
    <link rel="icon" type="image/png" href="./style/favicon.ico"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/validateForm.js"></script>
</head>
<body>
<div class="content">

    <h1 class="title">Capture the flag</h1>

    <form class="input-form" name="play-form" action="game/" onsubmit="return validateForm()" method="post">
        <input type="text" id="name" name="name" placeholder="jméno nebo přezdívka" autocomplete="off"></input>
		<button class="play-button" type="submit">Play</button>
    </form>
    <p id="error" class="error-message"></p>
</div>

<div class="bottom-text">
    <p>Created by George Sikora © 2020</p>
</div>

</body>
</html>

<?php if(isset($_GET['error'])) { ?>
    <script>
        $('#error').html('<?php echo($_GET["message"]."<br>Error: ".$_GET["error"]); ?>');
    </script>
<?php } ?>