<!DOCTYPE html>

<?php

    session_start();
    if(isset($_SESSION['name']) && isset($_SESSION['hashpswrd'])) { ?>

    <script>
        const post = {
            name:       '<?php echo $_SESSION['name'];?>',
            hashpswrd:  '<?php echo $_SESSION['hashpswrd'];?>'
        };

        console.log(post);
    </script>

    <?php } else {
        header('Location: /');
    }
    //session_destroy();
?>