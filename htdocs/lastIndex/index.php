<html>
<head>

    <title>Login</title>
    <link rel="stylesheet" href="style/main.css">

</head>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script>
	function validateForm() {
		var name = document.forms["play-form"]["player_name"].value;
        var error_message;
        
		if(!name.match(/^[a-zA-Z0-9_\sěščřžýáíéďĚŠČŘŽÝÁÍÉĎ]*$/)) error_message = "Jméno obsahuje nepovolené znaky!";
		if (name.length > 25) error_message = "Jméno může mít maximálně 25 znaků!";
		if (name.length < 3) error_message = "Jméno musí mít minimálně 3 znaky!";
		if (name == "") error_message = "Zadej jméno nebo přezdívku!";
		if(error_message  != null){
			$('#error').text(error_message);
			return false;
		}
	}
</script>

<body>

    <div class="center">

    <h1>Login to the game</h1>


        <div class="character-select">

            <div class="avatar">
                <img id="character-avatar"/>
                <img class="overlay" id="character-effect"/>
            </div>

            <div class="character-name">
                <h3 id="character-name"></h3>
            </div>
            
            <div class="character-desc">
                <span id="character-desc" class="character-desc"></span>
            </div>

            <a onclick="nextCharacter(-1);" class="button left"><i class="arrow left"></i></a>
            <a onclick="nextCharacter(1);" class="button right"><i class="arrow right"></i></a>
        </div>
        

    <form class="input-play" name="play-form" action="/game/" onsubmit="return validateForm()" method="post">
		<input type="text" id="name" name="player_name" placeholder="jméno nebo přezdívka" autocomplete="off"></input>
		<button class="play-button" type="submit">Hrát</button>
    </form>
    
	<p id="error" class="error-message"></p>

    </div>

</body>
</html>

<script>

const characters = [
    {name: 'Pepe',desc: 'Topovy hrdina', avatar: 'pepe.gif'},
    {name: 'Ricardo',desc: 'Sexy tanečky', avatar: 'ricardo.gif'},
    {name: 'Blablabla',desc: 'Dostaneš ban!', avatar: 'nigga.gif'},
    {name: 'Močálový Shrek',desc: 'Má velké bažiny', avatar: 'shrek.gif'}
];

let selectedCharacter = 0;
let animationEnd = true;

function nextCharacter(dir) {

    if(!animationEnd) return;
    animationEnd = false;

    selectedCharacter += dir;

    if(selectedCharacter < 0) selectedCharacter = characters.length-1;
    if(selectedCharacter > characters.length-1) selectedCharacter = 0;

    loadCharacter(selectedCharacter);
}

function loadCharacter(id) {

    setTimeout(() => {
        const character = characters[id];

        document.getElementById("character-name").innerHTML = character.name;
        document.getElementById("character-desc").innerHTML = character.desc;

        document.getElementById("character-avatar").src = 'characters/' + character.avatar;
        animationEnd = true;
    }, 640);

    document.getElementById("character-effect").src= "characters/effect.gif";
}

const character = characters[0];
document.getElementById("character-name").innerHTML = character.name;
document.getElementById("character-desc").innerHTML = character.desc;
document.getElementById("character-avatar").src = 'characters/' + character.avatar;

</script>