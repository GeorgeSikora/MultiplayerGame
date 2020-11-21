
let chat;

const CHAT_MESSAGE_DURATION = 9000; // ms

class Chat {
    constructor() {
        /* settings */
        this.LINES = 15; // maximum lines of chat

        /* dimensions px */
        this.LINE_HEIGHT    = 20;
        this.TEXT_SIZE      = 16;
        this.INPUT_PADDING  =  4;

        /* easing */
        this.TEXT_MOVE_EASING               = 0.10;
        this.INPUT_OPACITY_EASING           = 0.05;
        this.LINE_TIMEOUT_OPACITY_EASING    = 0.08;

        /* global */
        this.open = false;
        this.lines = [];
        this.textInput = '';

        /* easing variables */
        this.chatTargetY = 0;
        this.chatPosY = 0;
        this.inputTargetOpacity = 0;
        this.inputOpacity = 0;
    }

    draw(x, y){
        push();
        
        this.chatPosY += (this.chatTargetY - this.chatPosY) * this.TEXT_MOVE_EASING;
        translate(x, int(y +this.chatPosY), 0);
    
        textAlign(LEFT, BOTTOM);
        textSize(this.TEXT_SIZE);

        for(var i = 0; i < this.lines.length; i++){
            const line = this.lines[i];

            if(line.timeout < millis()) {
                line.opacity -= line.opacity * this.LINE_TIMEOUT_OPACITY_EASING;
                if(line.opacity < 1){
                    //this.lines.splice(this.lines.length-1,1);
                    //continue;
                    if(!this.open) continue;
                }
            }
            
            if(line.img != null) {
                if(!this.open) tint(255, line.opacity);
                imageMode(CORNER);
                image(line.img,0,-this.LINE_HEIGHT);
            } else {
                //console.error('Message img is null!');
            }

            translate(0,-this.LINE_HEIGHT);
        }
        pop();

        push();
        translate(x, y, 0);
        
        textAlign(LEFT, BOTTOM);
        textSize(this.TEXT_SIZE);

        this.inputOpacity += (this.inputTargetOpacity - this.inputOpacity) * this.INPUT_OPACITY_EASING;

        if(this.open){
            fill(0, this.inputOpacity);
            rect(0,-this.LINE_HEIGHT -this.INPUT_PADDING, 300, this.LINE_HEIGHT +2*this.INPUT_PADDING);

            fill(255);
            text(this.textInput + ((millis()%1000 < 500) ? '' : '|'), 2*this.INPUT_PADDING, 0);
        }
        pop();
    }
    
    add(msg) {
        if(msg.constructor.name === 'String'){
            this.lines.unshift(new Message().time().message(msg).build());
            this.lines.splice(this.LINES);
            return;
        }


        if(!this.open){
            this.chatPosY = (this.LINE_HEIGHT+this.INPUT_PADDING);
            this.chatTargetY = 0;
        } else {
            this.chatPosY = 0;
            this.chatTargetY = -(this.LINE_HEIGHT+this.INPUT_PADDING);
        }
        this.lines.unshift(msg);
        this.lines.splice(this.LINES);
    }

    keyPressed(){
        if(key === 'Enter') this.enter();
        if(key === 'Backspace') this.backspace();

        if(!this.open || key.length != 1) return;
        const k = key.charAt(0);

        if(this.isCharValid(k)){
            this.textInput += k;
        }
    }

    keyReleased(){
    }

    enter(){
        if(this.open){
            this.open = false; /* CLOSING */

            if(this.isValid(this.textInput)) {
                if(this.textInput[0] === '/'){
                    command(this.textInput.split('/')[1]);
                } else {
                    this.textInput = this.clearRepeatingSpecialChars(this.textInput);
                    socket.emit("chat-message", this.textInput);
                    this.add(new Message().time().name().message(this.textInput).build());
                }
            }
            this.textInput = '';
            
            /* chat pos MOVE DOWN */
            this.chatPosY = -(this.LINE_HEIGHT+2*this.INPUT_PADDING);
            this.chatTargetY = 0;

        } else {
            this.open = true; /* OPENING */

            /* chat pos MOVE UP */
            this.chatTargetY = -(this.LINE_HEIGHT+2*this.INPUT_PADDING);

            /* input box opacity FADE IN */
            this.inputTargetOpacity = 220;
            this.inputOpacity = 0;
        }
    }

    backspace(){
        this.textInput = this.textInput.slice(0, -1); 
    }

    isValid(input) {
        var validsCount = 0;

        for(var i = 0; i < input.length; i++){
            const k = input[i];
            if(k !== ' ' && k !== '&' && k !== '_') {
                validsCount++;
            }
        }
        return (input !== '' && validsCount != 0);
    }

    isCharValid(k) {

        if((k >= 'a' && k <= 'z') || (k >= 'A' && k <= 'Z') || (k >= '0' && k <= '9')) return true;

        const ALLOWED_SPECIAL_CHARS = ' _,.:+-=/?!()"\'#&@ěščřžýáíéúůĚŠČŘŽÝÁÍÉÚŮ';

        for(var i = 0; i < ALLOWED_SPECIAL_CHARS.length; i++){
            if(k === ALLOWED_SPECIAL_CHARS[i]) return true;
        }

        return false;
    }

    clearRepeatingSpecialChars(input) {
        var output = '';
        for(var i = 0; i < input.length; i++){
            const k = input[i];
            const k_last = input[i-1];

            if(k === ' ' || k === '_') {
                if(i == 0) continue;
                if(k !== k_last) output += k;
            } else {
                output += k;
            }
        }
        return output;
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
}