<!DOCTYPE html>
<html>
<head>

  <!-- LIBRARIES -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

  <?php require('php/gateway.php') ?>

  <title>Capture the flag</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

  <link rel="icon" type="image/png" href="../style/favicon.ico"/>
  <link rel="stylesheet" href="assets/styles/main.css">

  <script src="../js/introduction.js"></script>

  <?php require('php/scripts.php') ?>

</head>
<body oncontextmenu="return false;">

  <div id="lobbymenu">
    <div class="buttons-group">
      <a href="#" class="button active">Lobby</a>
      <a href="#" class="button">Profile</a>
      <a href="#" class="button">Events</a>
    </div>
  </div>

  <div id="menu">
    <div id="content"></div>
  </div>

</body>
</html>