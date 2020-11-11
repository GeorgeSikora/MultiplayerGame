
<?php require('gateway.php') ?>

<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

  <title>Wisteria</title>

  <!-- IMPORT LIBRARIES -->
  <script src="libraries/p5.min.js"></script>
  <script src="libraries/socket.io.js"></script>

  <!-- IMPORT ASSETS -->
  <script src="assets/assets.js"></script>

  <!-- IMPORT COLLISION SYSTEM -->
  <script src="collisions/functions.js"></script>
  <script src="collisions/main.js"></script>

  <!-- IMPORT ENTITIES -->
  <script src="entities/GameObject.js"></script>
  <script src="entities/MyPlayer.js"></script>
  <script src="entities/Player.js"></script>
  <script src="entities/Block.js"></script>
  <script src="entities/Bullet.js"></script>

  <!-- IMPORT OTHER SKETCHES -->
  <script src="functions.js"></script>
  <script src="camera.js"></script>
  <script src="socket.js"></script>

  <!-- IMPORT MAIN SKETCH -->
  <script src="game.js"></script>

  <style> body { padding: 0; margin: 0; background-color: black; } </style>
</head>

<body oncontextmenu="return false;">
</body>
</html>
