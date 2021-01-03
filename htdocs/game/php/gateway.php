<!DOCTYPE html>

<?php
    session_start();  

    if(isset($_SESSION['name'])) { ?>

    <script>
        const post = {
            name:    '<?php echo $_SESSION['name'];?>'
        };

        console.log(post);

    </script>

    <?php } else {
        header('Location: /');
    }
?>