<?php
    if(isset($_POST['name']) && isset($_POST['color'])) { ?>

    <script>
        let name  = '<?php echo $_POST['name'];?>';
        let color = '<?php echo $_POST['color'];?>';
    </script>

    <?php } else {
        header('Location: /');
    }
?>