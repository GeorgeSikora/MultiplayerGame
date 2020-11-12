
<?php require('php/gateway.php') ?>

<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

  <title>Wisteria</title>

  <?php require('php/scripts.php') ?>

  <link rel="stylesheet" href="assets/styles/main.css">

</head>
<body oncontextmenu="return false;">

  <div id="menu">
    <input type="range" id="volume" onchange="Howler.volume(this.value/100.0)" min="1" max="100" value="30">
  </div>

</body>
</html>