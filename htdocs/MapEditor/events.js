
let gameRunning = false;

onload = () => {
    $("#server-start").show();
    $("#server-stop").hide();
}

function startServer() {
    console.log('Starting server...');
    $("#server-start").hide();
    $("#server-stop").show();
}

function stopServer() {
    console.log('Stopping server...');
    $("#server-start").show();
    $("#server-stop").hide();
}
function toggleSidebar() {
    sidebar(!sidebarOpened);
}

let sidebarOpened = false;
function sidebar(state) {
    if (state) {
        $("#sidebar").width(250);
        $(".sidebar-toggle").css("right", 250);
        $(".sidebar-toggle").html('<i class="fa fa-caret-right"></i>');
    } else {
        $("#sidebar").width(0);
        $(".sidebar-toggle").css("right", 0);
        $(".sidebar-toggle").html('<i class="fa fa-caret-left"></i>');
    }
    sidebarOpened = state;
}