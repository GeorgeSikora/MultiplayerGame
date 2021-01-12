<?php
if (isset($_GET['err']) && isset($_GET['msg'])) {
    $err = $_GET['err'];
    $msg = $_GET['msg'];
} else {
    $err = 0;
    $msg = 'Error cannot be solved';
}
?>

<div class="content">

    <img src="/style/images/flags-logo.png" width="80%" alt="Banner">

    <h1 class="error-title">Error <?php echo $err ?></h1>
    <p class="error-description"><?php echo $msg ?></p>
    <div class="links"><a href="/home">Home</a></div>

</div>