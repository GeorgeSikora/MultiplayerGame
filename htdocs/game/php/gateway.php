<!DOCTYPE html>

<?php
    if(isset($_POST['name']) && isset($_POST['color'])) { ?>

    <script>
        const post = {
            name:  '<?php echo $_POST['name'];?>',
            color: '<?php echo $_POST['color'];?>'
        };
    </script>

    <?php } else {
        header('Location: /');
    }
?>