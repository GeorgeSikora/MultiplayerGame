<!DOCTYPE html>

<html>
<head>
  <?php require('php/gateway.php') ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

  <title>Wisteria</title>

  <?php require('php/scripts.php') ?>

  <link rel="stylesheet" href="assets/styles/main.css">

  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<body oncontextmenu="return false;">

  <div id="menu">
    <div class="content">

    <h1>Menu</h1>
    <div class="slider">
      <p>Master volume: &nbsp<p id="masterVolume">30</p></p>
      <input type="range" id="volume" min="1" max="100" value="30">
    </div>

    <div class="slider">
      <p>Master volume:</p>
      <input type="range" id="volume" min="1" max="100" value="30">
    </div>

    <div class="slider">
      <p>Master volume:</p>
      <input type="range" id="volume" min="1" max="100" value="30">
    </div>

    </div>
  </div>

</body>
</html>

<script>

  $("#volume").on("input change", function() {
    Howler.volume(this.value/100.0);
    $("#masterVolume").html(this.value);
  });

</script>