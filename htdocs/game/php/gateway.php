<!DOCTYPE html>

<?php
    if(isset($_GET['name']) && isset($_GET['color'])) { ?>

    <script>
        const post = {
            name:    '<?php echo $_GET['name'];?>',
            color:   '<?php echo $_GET['color'];?>'
        };
        const PORT = '<?php if(isset($_GET['port'])) echo $_GET['port']; else echo 1771;?>'; 
        console.log('PORT = ' + PORT);
    </script>

    <?php } else {
        header('Location: /');
    }
?>