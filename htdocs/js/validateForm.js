
function validateLoginForm() {
    var name = $('#nickname').val();
    var pswrd = $('#password').val();
    var error_message;
    
    // Password check
    if(!pswrd.match(/^[a-zA-Z0-9_-\s]*$/)) error_message = "Heslo obsahuje nepovolené znaky!";
    if (pswrd.length > 25) error_message = "Heslo může mít maximálně 25 znaků!";
    if (pswrd.length < 5) error_message = "Heslo musí mít minimálně 5 znaků!";
    if (pswrd == "") error_message = "Zadej přihlašovací heslo!";
    
    // Nickname check
    if(!name.match(/^[a-zA-Z0-9_\s]*$/)) error_message = "Jméno obsahuje nepovolené znaky!"; //ěščřžýáíéďĚŠČŘŽÝÁÍÉĎ
    if (name.length > 25) error_message = "Jméno může mít maximálně 25 znaků!";
    if (name.length < 3) error_message = "Jméno musí mít minimálně 3 znaky!";
    if (name == "") error_message = "Zadej přihlašovací jméno!";

    if (error_message != null) {
        $('#error').text(error_message);
        if($('#error').is(":visible")) {
            $('#error').effect("shake", {times: 2, distance: 10}, 300);
        } else {
            $('#error').show("fast");
        }
        return false;
    }

    // Password hashing
    var md5Hash = CryptoJS.MD5(pswrd);
    var sha256Hash = CryptoJS.SHA256(pswrd);

    document.getElementById("password").value = '';
    document.getElementById("hashpswrd").value = md5Hash;
    return true;
}

function validateRegisterForm() {
    var name = $('#nickname').val();
    var pswrd = $('#password').val();
    var confirm = $('#confirm').is(':checked');
    var error_message;
    
    // Confirm check
    if (!confirm) error_message = "Musíš souhlasit s pravidly!";
    
    // Password check
    if(!pswrd.match(/^[a-zA-Z0-9_-\s]*$/)) error_message = "Heslo obsahuje nepovolené znaky!";
    if (pswrd.length > 25) error_message = "Heslo může mít maximálně 25 znaků!";
    if (pswrd.length < 5) error_message = "Heslo musí mít minimálně 5 znaků!";
    if (pswrd == "") error_message = "Zadej heslo!";
    
    // Nickname check
    if(!name.match(/^[a-zA-Z0-9_\s]*$/)) error_message = "Jméno obsahuje nepovolené znaky!"; //ěščřžýáíéďĚŠČŘŽÝÁÍÉĎ
    if (name.length > 25) error_message = "Jméno může mít maximálně 25 znaků!";
    if (name.length < 3) error_message = "Jméno musí mít minimálně 3 znaky!";
    if (name == "") error_message = "Zadej jméno nebo přezdívku!";

    if (error_message != null) {
        $('#error').text(error_message);
        if($('#error').is(":visible")) {
            $('#error').effect("shake", {times: 2, distance: 10}, 300);
        } else {
            $('#error').show("fast");
        }
        return false;
    }

    // Password hashing
    var md5Hash = CryptoJS.MD5(pswrd);
    var sha256Hash = CryptoJS.SHA256(pswrd);

    document.getElementById("password").value = '';
    document.getElementById("hashpswrd").value = md5Hash;
    return true;
}