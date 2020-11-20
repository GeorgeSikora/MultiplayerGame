<!DOCTYPE html>

<?php
    if(isset($_POST['name'])) { ?>

    <script>
        const post = {
            name:    '<?php echo $_POST['name'];?>'
        };
    </script>

    <?php } else {
        header('Location: /');
    }
?>