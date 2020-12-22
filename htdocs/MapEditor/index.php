<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<link rel="stylesheet" href="style/main.css">
<link rel="stylesheet" href="style/navbar.css">
<link rel="stylesheet" href="style/sidebar.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js"></script>

<script src="main.js"></script>
<script src="events.js"></script>

</head>
<body>

<div class="navbar">
  <?php require('php/navbar.php') ?>
</div>

<a class="sidebar-toggle" href="javascript:toggleSidebar()"><i class="fa fa-caret-left"></i></a>
<div id="sidebar" class="sidebar">
  <div class="content">
  <p>Ahoooj!</p>
</div>
</div>

</body>
</html>
