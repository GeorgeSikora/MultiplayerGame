<!DOCTYPE html>

<?php

    session_start();
    if(isset($_SESSION['name']) && isset($_SESSION['password'])) { ?>

    <script>
        const post = {
            name:       '<?php echo $_SESSION['name'];?>'
            password:   '<?php echo $_SESSION['password'];?>'
        };

        console.log(post);
    </script>

    <?php } else {
        header('Location: /');
    }
?>