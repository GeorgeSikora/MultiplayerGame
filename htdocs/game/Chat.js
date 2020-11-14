
let chat;
/*
const CHAT_LINES = 10;
const CHAT_LINE_HEIGHT = 32;
const CHAT_TEXT_SIZE = 32;
*/


class Chat {
    constructor() {
        this.LINES = 10;
        this.LINE_HEIGHT = 24;
        this.TEXT_SIZE = 20;

        this.open = false;
        this.lines = [];

        this.textInput = '';
    }
    add(msg) {
        this.lines.unshift(msg);
        this.lines.splice(this.LINES);
    }
    draw(x,y){
        push();
        translate(x,y,100);
    
        textAlign(LEFT, BOTTOM);
        textSize(this.TEXT_SIZE);

        if(this.open){
            fill(0, 100);
            rect(0,-this.LINE_HEIGHT -3, 300, this.LINE_HEIGHT +6);

            fill(255,255,0);
            text(this.textInput + ((millis()%1000 < 500) ? '' : '|'), 6, 0);
            translate(0,-this.LINE_HEIGHT);
        }

        for(var i = 0; i < this.lines.length; i++){
            push();
            fill(WHITE);
            var token = 1;
            for (var k = 0; k < this.lines[i].str.length; k++) {
                if(this.lines[i].str[k] === '&' && k < this.lines[i].str.length-1){
                    this.useToken(token = this.lines[i].str[k=k+1]);

                    if(this.lines[i].str[k=k+1] === '&'){
                        token = this.lines[i].str[k=k+1];
                        this.useToken(token);
                    }
                }
                var c = this.lines[i].str[k];
                if(token == 'x') c = char(random(256));
                if(token == 'z') c = (millis()%300<150)?'x':'o';
                text(c, 0, 0);
                translate(textWidth(c),0);
            }
            pop();
            translate(0,-this.LINE_HEIGHT);
        }
        pop();
    }
    useToken(token){
        switch(token){
            case '0':fill(BLACK);break;
            case '1':fill(WHITE);break;
            case '2':fill(RED);break;
            case '3':fill(YELLOW);break;
            case '4':fill(ORANGE);break;
            case '5':fill(GREEN);break;
            case '6':fill(AQUA);break;
            case '7':fill(BLUE);break;
            case '8':fill(PURPLE);break;
            case '9':fill(GRAY);break;
            case 'a':fill(0);break;
            case 'b':fill(0);break;
            case 'c':fill(0);break;
            case 'd':fill(0);break;
            case 'e':fill(0);break;
            case 'f':fill(0);break;
        }
    }
    keyPressed(){
        if(key === 'Enter') this.enter();
        if(key === 'Backspace') this.backspace();

        if(!this.open || key.length != 1) return;
        const k = key.charAt(0);

        if((k >= 'a' && k <= 'z') || (k >= 'A' && k <= 'Z') || (k >= '0' && k <= '9') || k == ' ' || k == '&' || k == '?' || k == '!' || k == '#' || k == '_' || k == '+' || k == '-' || k == '.' || k == ','){
            this.textInput += k;
        }
    }
    keyReleased(){

    }
    enter(){
        if(this.open && this.textInput !== ''){
            socket.emit("chat-message", this.textInput);
            this.add(new Message(this.textInput));
            this.textInput = '';
        }
        this.open = !this.open;
    }
    backspace(){
        this.textInput = this.textInput.slice(0, -1); 
    }
}

class Message {
    constructor(message){
        this.str = '&9[' + this.getTime() + '] &' + getColorToken(player.colorID) + player.name + ': ' + message;
    }
    getTime(){
        return hour().toString().padStart(2,'0') + ':' + minute().toString().padStart(2,'0');
    }
}