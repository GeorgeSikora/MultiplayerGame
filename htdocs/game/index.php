<!DOCTYPE html>

<html>
<head>
  <?php require('php/gateway.php') ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
  <link rel="icon" type="image/png" href="/style/favicon.ico"/>

  <title>Capture the flag</title>

  <?php require('php/scripts.php') ?>

  <link rel="stylesheet" href="assets/styles/main.css">
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<body oncontextmenu="return false;">

  <div id="menu">
    <div id="content"></div>
  </div>

</body>
</html>

<script>

/* function for loading */
function loadScreen (screen) {
  switch (screen){
    case 'menu':
      $('#content').load("menu/main.html");
      break;
    case 'settings':
      $('#content').load("menu/settings.html");
      break;
    case 'credits':
      $('#content').load("menu/credits.html");
      break;
  }
}

/* set default volumes */
Howler.volume(0.3);
let volumeMusic = 0.5; 

</script>