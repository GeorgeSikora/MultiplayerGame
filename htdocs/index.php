<html>
<head>

    <title>Wisteria</title>
    <link rel="stylesheet" href="style/main.css">

</head>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script src="validateForm.js"></script>

<body>
<div class="center">

    <h1>Multiplayer cube</h1>

    <span>Select color of your cube:</span>

    <div class="colorselect" style="text-align: center;">
        <button id="color0" onclick="selectColor(0);" class="red">     </button>
        <button id="color1" onclick="selectColor(1);" class="orange">  </button>
        <button id="color2" onclick="selectColor(2);" class="yellow">  </button>
        <button id="color3" onclick="selectColor(3);" class="green">   </button>
        <button id="color4" onclick="selectColor(4);" class="aqua">    </button>
        <button id="color5" onclick="selectColor(5);" class="blue">    </button>
        <button id="color6" onclick="selectColor(6);" class="purple">  </button>
    </div>

    <br>

    <span>and type your name:</span>

    <form class="input-play" name="play-form" action="/game/" onsubmit="return validateForm()" method="post">
		<input type="text" id="name" name="name" placeholder="jméno nebo přezdívka" autocomplete="off"></input>
        <input type="hidden" id="selected-color" name="color"></input>
        <br><br>
		<button class="play" type="submit">Play</button>
    </form>
    
	<p id="error" class="error-message"></p>

</div>
</body>
</html>

<script>

const colors = [
    {name: 'Red'    ,val: '#DF0000'},
    {name: 'Orange' ,val: '#FF8000'},
    {name: 'Yellow' ,val: '#FFFF00'},
    {name: 'Green'  ,val: '#00FF00'},
    {name: 'Aqua'   ,val: '#00D4D4'},
    {name: 'Blue'   ,val: '#0000FF'},
    {name: 'Purple' ,val: '#50007F'}
];

var outlineDefault = 'none';
var outlineSelected = '5px auto -webkit-focus-ring-color';

let selectedID = 0;
selectColor(selectedID);

function selectColor(id) {
    document.getElementById('color' + selectedID).style.outline = outlineDefault;
    document.getElementById('color' + id).style.outline = outlineSelected;

    selectedID = id;
    console.log(colors[selectedID].name);
    document.getElementById('selected-color').value = colors[selectedID].val;
} 

</script>