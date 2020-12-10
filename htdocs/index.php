<!DOCTYPE html>
<html>
<head>
    <title>Capture the flag</title>
    <link rel="stylesheet" href="style/main.css">
    <link rel="icon" type="image/png" href="style/favicon.ico"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/validateForm.js"></script>
</head>
<body>
<div class="content">

    <h1>Capture the flag</h1>
    <!--<span>Select color of your cube:</span>

    <div class="colorselect" style="text-align: center;">

        <button id="color0" class="red"  onclick="selectColor(0);">    </button>
        <button id="color1" class="blue" onclick="selectColor(1);">   </button>
        <button id="color0" onclick="selectColor(0);" class="red">     </button>
        <button id="color1" onclick="selectColor(1);" class="orange">  </button>
        <button id="color2" onclick="selectColor(2);" class="yellow">  </button>
        <button id="color3" onclick="selectColor(3);" class="green">   </button>
        <button id="color4" onclick="selectColor(4);" class="aqua">    </button>
        <button id="color5" onclick="selectColor(5);" class="blue">    </button>
        <button id="color6" onclick="selectColor(6);" class="purple">  </button>
    </div>
    -->
    <form class="input-play" name="play-form" action="game/" onsubmit="return validateForm()" method="post">
        <input type="text" id="name" name="name" placeholder="jméno nebo přezdívka" autocomplete="off"></input>
        <!-- <input type="hidden" id="selected-color" name="color"></input> -->
        <br><br>
		<button class="play-button" type="submit">Play</button>
    </form>
    <p id="error" class="error-message"></p>
</div>

<div class="bottom-text">
    <p>Created by George Sikora © 2020</p>
</div>

</body>
</html>

<!--
<script src="js/colorSelect.js"></script>
-->

<?php if(isset($_GET['error'])){ ?>
    <script>
        $('#error').html('<?php echo($_GET["message"]."<br>Error: ".$_GET["error"]); ?>');
    </script>
<?php } ?>