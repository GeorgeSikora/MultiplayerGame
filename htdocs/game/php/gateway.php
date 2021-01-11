<!DOCTYPE html>

<?php

    session_start();

    if(isset($_SESSION['name']) && isset($_SESSION['hashpswrd'])) { ?>

    <script>
        
        const session = {
            name:       '<?php echo $_SESSION['name'];?>',
            hashpswrd:  '<?php echo $_SESSION['hashpswrd'];?>'
        };
        console.log(session);

        request = $.ajax({
        url: "/php/loginGate",
        type: "post",
        data: {
            nickname: session.name,
            hashpswrd: session.hashpswrd
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