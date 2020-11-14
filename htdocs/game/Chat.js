
let chat;
/*
const CHAT_LINES = 10;
const CHAT_LINE_HEIGHT = 32;
const CHAT_TEXT_SIZE = 32;
*/

class Chat {
    constructor() {
        this.LINES = 10;
        this.LINE_HEIGHT = 18;
        this.TEXT_SIZE = 16;

        this.open = false;
        this.lines = [];

        this.textInput = '';

        this.chatTargetY = 0;
        this.chatPosY = 0;

        this.inputTargetOpacity = 0;
        this.inputOpacity = 0;
    }
    add(msg) {
        if(!this.open){
            this.chatPosY = (this.LINE_HEIGHT+3);
            this.chatTargetY = 0;
        } else {
            this.chatPosY = 0;
            this.chatTargetY = -(this.LINE_HEIGHT+3);
        }
        this.lines.unshift(msg);
        this.lines.splice(this.LINES);
    }
    draw(x,y){
        push();
        
        this.chatPosY += (this.chatTargetY - this.chatPosY) * 0.5;
        translate(x,y+this.chatPosY,100);
    
        textAlign(LEFT, BOTTOM);
        textSize(this.TEXT_SIZE);

        for(var i = 0; i < this.lines.length; i++){

            if(this.lines[i].timeout < millis()) {
                
                this.lines[i].opacity -= this.lines[i].opacity*0.08;
                if(this.lines[i].opacity < 1){
                    this.lines.splice(this.lines.length-1,1);
                    continue;
                }
            }

            push();
            fill(WHITE);
            var token = {color: WHITE};
            for (var k = 0; k < this.lines[i].str.length; k++) {
                while(this.lines[i].str[k] === '&' && k < this.lines[i].str.length){
                    token = this.useToken(this.lines[i].str[k=k+1], token);
                    k++;
                }
                var c = this.lines[i].str[k];
                if(token.crazyText) c = char(random(256));
                const col = color(token.color);
                fill(red(col), green(col), blue(col), this.lines[i].opacity);
                text(c, 0, 0);
                translate(textWidth(c),0);
            }
            pop();
            translate(0,-this.LINE_HEIGHT);
        }
        pop();

        push();
        translate(x, y, 100);
        
        textAlign(LEFT, BOTTOM);
        textSize(this.TEXT_SIZE);

        this.inputOpacity += (this.inputTargetOpacity - this.inputOpacity) * 0.05;
        this.inputPosY += (this.inputTargetY - this.inputPosY) * 0.1;

        if(this.open){
            fill(0, this.inputOpacity);
            rect(0,-this.LINE_HEIGHT -3, 300, this.LINE_HEIGHT +6);

            fill(255);
            text(this.textInput + ((millis()%1000 < 500) ? '' : '|'), 6, 0);
        }
        pop();
    }
    useToken(param, token){
        switch(param){
            case '0':token.color = BLACK;   break;
            case '1':token.color = WHITE;   break;
            case '2':token.color = RED;     break;
            case '3':token.color = ORANGE;  break;
            case '4':token.color = YELLOW;  break;
            case '5':token.color = GREEN;   break;
            case '6':token.color = AQUA;    break;
            case '7':token.color = BLUE;    break;
            case '8':token.color = PURPLE;  break;
            case '9':token.color = GRAY;    break;
            case 'a':token.color = PINK;    break;
            case 'b':token.color = 0;       break;
            case 'c':token.color = 0;       break;
            case 'd':token.color = 0;       break;
            case 'e':token.color = 0;       break;
            case 'f':token.color = 0;       break;
            case 'x':token.crazyText = true;break;
            case 'r':token = {color: WHITE};break;
        } return token;
    }
    keyPressed(){
        if(key === 'Enter') this.enter();
        if(key === 'Backspace') this.backspace();

        if(!this.open || key.length != 1) return;
        const k = key.charAt(0);

        if((k >= 'a' && k <= 'z') || (k >= 'A' && k <= 'Z') || (k >= '0' && k <= '9') || k == ' ' || k == '(' || k == ')' || k == ':' || k == '&' || k == '?' || k == '!' || k == '#' || k == '_' || k == '+' || k == '-' || k == '.' || k == ','){
            this.textInput += k;
        }
    }
    keyReleased(){

    }
    enter(){
        this.open = !this.open;

        if(!this.open){
            if(this.textInput !== ''){
            socket.emit("chat-message", this.textInput);
            this.add(new Message(this.textInput));
            this.textInput = '';
        }
            
            // closing
            this.chatPosY = -(this.LINE_HEIGHT+6);
            this.chatTargetY = 0;
        } else {
            // opening
            this.chatTargetY = -(this.LINE_HEIGHT+6);

            this.inputTargetOpacity = 220;
            this.inputOpacity = 0;
        }
    }
    backspace(){
        this.textInput = this.textInput.slice(0, -1); 
    }
}

class Message {
    constructor(message){
        this.str = '&9[' + this.getTime() + '] &' + getColorToken(player.colorID) + player.name + '&1 ' + message;
        this.timeout = millis() + 5000;
        this.opacity = 255;
    }
    getTime(){
        return hour().toString().padStart(2,'0') + ':' + minute().toString().padStart(2,'0');
    }
}