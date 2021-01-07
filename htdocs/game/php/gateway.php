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

        request = $.ajax({
        url: "/php/loginGate",
        type: "post",
        data: {
            nickname: post.name,
            hashpswrd: post.hashpswrd
        },
        success: function(result) {
            if (result) {
                window.location.href = "/login";
            }
        }

    });

    </script>

    <?php } else {
        header('Location: /');
    }
    //session_destroy();
?>