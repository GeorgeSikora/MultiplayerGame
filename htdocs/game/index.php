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
      <p>Master: &nbsp<p id="masterVolume">30</p></p>
      <input type="range" id="volume-master" min="0" max="100" value="30">
    </div>

    <div class="slider">
      <p>Music: &nbsp<p id="musicVolume">50</p></p>
      <input type="range" id="volume-music" min="0" max="100" value="50">
    </div>

    </div>
  </div>

</body>
</html>

<script>

  /* set default volumes */
  Howler.volume(0.3);
  let volumeMusic = 0.5; 

  $("#volume-master").on("input change", function() {
    Howler.volume(this.value/100.0);
    $("#masterVolume").html(this.value);
  });

  $("#volume-music").on("input change", function() {
    volumeMusic = (this.value/100.0);
    if(!inGame){
      music_menu.volume(volumeMusic, music_menu_id);
    }
    $("#musicVolume").html(this.value);
  });

</script>