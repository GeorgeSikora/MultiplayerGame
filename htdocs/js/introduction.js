console.log('%c' + (s => s.raw)`
▄████▄   ▄▄▄       ██▓███  ▄▄▄█████▓ █    ██  ██▀███  ▓█████   
▒██▀ ▀█  ▒████▄    ▓██░  ██▒▓  ██▒ ▓▒ ██  ▓██▒▓██ ▒ ██▒▓█   ▀  
▒▓█    ▄ ▒██  ▀█▄  ▓██░ ██▓▒▒ ▓██░ ▒░▓██  ▒██░▓██ ░▄█ ▒▒███    
▒▓▓▄ ▄██▒░██▄▄▄▄██ ▒██▄█▓▒ ▒░ ▓██▓ ░ ▓▓█  ░██░▒██▀▀█▄  ▒▓█  ▄  
▒ ▓███▀ ░ ▓█   ▓██▒▒██▒ ░  ░  ▒██▒ ░ ▒▒█████▓ ░██▓ ▒██▒░▒████▒ 
░ ░▒ ▒  ░ ▒▒   ▓▒█░▒▓▒░ ░  ░  ▒ ░░   ░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░░░ ▒░ ░ 
  ░  ▒     ▒   ▒▒ ░░▒ ░         ░    ░░▒░ ░ ░   ░▒ ░ ▒░ ░ ░  ░ 
░          ░   ▒   ░░         ░       ░░░ ░ ░   ░░   ░    ░    
░ ░            ░  ░                     ░        ░        ░  ░ 
░                                                              
▄▄▄█████▓ ██░ ██ ▓█████      █████▒██▓    ▄▄▄        ▄████     
▓  ██▒ ▓▒▓██░ ██▒▓█   ▀    ▓██   ▒▓██▒   ▒████▄     ██▒ ▀█▒    
▒ ▓██░ ▒░▒██▀▀██░▒███      ▒████ ░▒██░   ▒██  ▀█▄  ▒██░▄▄▄░    
░ ▓██▓ ░ ░▓█ ░██ ▒▓█  ▄    ░▓█▒  ░▒██░   ░██▄▄▄▄██ ░▓█  ██▓    
  ▒██▒ ░ ░▓█▒░██▓░▒████▒   ░▒█░   ░██████▒▓█   ▓██▒░▒▓███▀▒    
  ▒ ░░    ▒ ░░▒░▒░░ ▒░ ░    ▒ ░   ░ ▒░▓  ░▒▒   ▓▒█░ ░▒   ▒     
    ░     ▒ ░▒░ ░ ░ ░  ░    ░     ░ ░ ▒  ░ ▒   ▒▒ ░  ░   ░     
  ░       ░  ░░ ░   ░       ░ ░     ░ ░    ░   ▒   ░ ░   ░     
          ░  ░  ░   ░  ░              ░  ░     ░  ░      ░   

    Jiří Sikora / 2020 - 2021 / MultiplayerGame Project
`[0], "font-family:monospace; color: coral;");

consoleImage('https://media.giphy.com/media/IgQjFbW0Zn1PIZqEQm/giphy.gif');

function consoleImage(url) {
    // Create a new `Image` instance
    var image = new Image();
  
    image.onload = function() {
      // Inside here we already have the dimensions of the loaded image
      var style = [
        // Hacky way of forcing image's viewport using `font-size` and `line-height`
        'font-size: 1px;',
  
        // Hacky way of forcing a middle/center anchor point for the image
        'padding: ' + this.height * .5 + 'px ' + this.width * .5 + 'px;',
  
        // Set image dimensions
        //'background-size: ' + this.width + 'px ' + this.height + 'px;',
  
        // Set image URL
        'background: url('+ url +');'
       ].join(' ');
  
       // notice the space after %c
       console.log('%c ', style);

       console.log('%cAntiCheat is enabled!', "font-size: 36px; font-family:monospace; color: red;")
       
    };
  
    // Actually loads the image
    image.src = url;
  };