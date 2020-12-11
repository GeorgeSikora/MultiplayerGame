
function validateForm() {
    var name = document.forms["play-form"]["name"].value;
    var error_message;
    
    if(!name.match(/^[a-zA-Z0-9_\s]*$/)) error_message = "Jméno obsahuje nepovolené znaky!"; //ěščřžýáíéďĚŠČŘŽÝÁÍÉĎ
    
    if (name.length > 25) error_message = "Jméno může mít maximálně 25 znaků!";
    
    if (name.length < 3) error_message = "Jméno musí mít minimálně 3 znaky!";
    
    if (name == "") error_message = "Zadej jméno nebo přezdívku!";
    
    if (error_message  != null) {
        $('#error').text(error_message);
        return false;
    }
}