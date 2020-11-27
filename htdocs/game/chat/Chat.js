
let chat;

class Chat {

    /* settings */
    static LINES = 15; // maximum lines of chat
    static MESSAGE_DURATION = 9000; // line hide timeout in ms

    /* dimensions px */
    static LINE_HEIGHT    = 20;
    static TEXT_SIZE      = 16;
    static INPUT_PADDING  =  4;

    /* easing */
    static TEXT_MOVE_EASING             = 0.10;
    static INPUT_OPACITY_EASING         = 0.05;
    static LINE_TIMEOUT_OPACITY_EASING  = 0.08;

    constructor() {
        /* MAIN VARIABLES */
        this.open = false;
        this.lines = [];
        this.textInput = '';

        /* VARIABLE WITH EASING USE */
        this.chatTargetY = 0;
        this.chatPosY = 0;
        this.inputTargetOpacity = 0;
        this.inputOpacity = 0;
    }

    draw(x, y) {
        /*-----------------*/
        /* DRAW CHAT LINES */
        /*-----------------*/
        push();

        /* chat open pop-ups easing */
        this.chatPosY += (this.chatTargetY - this.chatPosY) * Chat.TEXT_MOVE_EASING;

        /* setup properties */
        translate(x, int(y +this.chatPosY), 0);
        textAlign(LEFT, BOTTOM);
        textSize(this.TEXT_SIZE);
        imageMode(CORNER);

        /* go through each chat line */
        for(var i = 0; i < this.lines.length; i++){
            const line = this.lines[i];

            /* if timeout gone, decrease the opacity to zero */
            if(line.timeout < millis()) {
                line.opacity -= line.opacity * Chat.LINE_TIMEOUT_OPACITY_EASING;
                if(line.opacity < 1){
                    // ONLY WHEN YOU WANT TO REMOVE AFTER OPACITY DROPS DOWN
                    //this.lines.splice(this.lines.length-1,1);
                    //continue;
                    if(!this.open) continue;
                }
            }   

            /* draw the message line */
            if(line.img != null) {
                if(!this.open) tint(255, line.opacity);
                image(line.img, 0, -Chat.LINE_HEIGHT);
            } else {
                //console.error('Message img is null!');
            }

            /* move the position for next line */
            translate(0, -Chat.LINE_HEIGHT);
        }
        pop();

        /*-------------------------*/
        /* DRAW INPUT BOX AND TEXT */
        /*-------------------------*/
        push();

        /* setup properties */
        translate(x, y, 0);
        textAlign(LEFT, BOTTOM);
        textSize(Chat.TEXT_SIZE);

        /* input opacity easing */
        this.inputOpacity += (this.inputTargetOpacity - this.inputOpacity) * Chat.INPUT_OPACITY_EASING;

        if(this.open){

            /* input box */
            noStroke();
            fill(0, this.inputOpacity);
            rectMode(CORNER);
            rect(0,-Chat.LINE_HEIGHT -Chat.INPUT_PADDING, 300, Chat.LINE_HEIGHT +2*Chat.INPUT_PADDING);

            /* input text */
            fill(255);
            text(this.textInput + ((millis()%1000 < 500) ? '' : '|'), 2*Chat.INPUT_PADDING, 0);
        }
        pop();
    }
    
    add(msg) {
        /* message comes only as string */
        if(msg.constructor.name === 'String'){
            /* add new message */
            this.lines.unshift(new Message().time().message(msg).build());
            /* if lines is more than we wanted, splice it */
            this.lines.splice(Chat.LINES);
            return;
        }
        /* animation easing */
        if(!this.open){
            this.chatPosY = (Chat.LINE_HEIGHT +Chat.INPUT_PADDING);
            this.chatTargetY = 0;
        } else {
            this.chatPosY = 0;
            this.chatTargetY = -(Chat.LINE_HEIGHT +Chat.INPUT_PADDING);
        }
        /* add new message */
        this.lines.unshift(msg);
        /* if lines is more than we wanted, splice it */
        this.lines.splice(Chat.LINES);
    }

    keyPressed(){
        if(key === 'Enter') this.enter();
        if(key === 'Backspace') this.backspace();

        /* make sure we dont have chat closed and the key is only one char */
        if(!this.open || key.length != 1) return;

        /* get pressed char */
        const c = key.charAt(0);

        /* test if char is valid */
        if(this.isCharValid(c)){
            this.textInput += c;
        }
    }

    enter(){
        if(this.open) {
            /* CLOSING */
            this.open = false; 

            if(this.isValid(this.textInput)) {
                if(this.textInput[0] === '/'){
                    /* do a command */
                    command(this.textInput.split('/')[1]);
                } else {
                    /* add new text message */
                    this.textInput = this.clearRepeatingSpecialChars(this.textInput);
                    socket.emit("chat-message", this.textInput);
                    this.add(new Message().time().name().message(this.textInput).build());
                }
            }
            /* clear the text input */
            this.textInput = '';
            
            /* chat pos MOVE DOWN */
            this.chatPosY = -(Chat.LINE_HEIGHT+2*Chat.INPUT_PADDING);
            this.chatTargetY = 0;

        } else {
            /* OPENING */
            this.open = true; 

            /* chat pos MOVE UP */
            this.chatTargetY = -(Chat.LINE_HEIGHT+2*Chat.INPUT_PADDING);

            /* input box opacity FADE IN */
            this.inputTargetOpacity = 220;
            this.inputOpacity = 0;
        }
    }

    backspace(){
        /* remove the last char in the input text */
        this.textInput = this.textInput.slice(0, -1); 
    }

    isValid(text) {
        var validChars = 0;

        for(var i = 0; i < text.length; i++){
            const c = text[i];
            if(c !== ' ' && c !== '&' && c !== '_') validChars++;
        }

        return (text !== '' && validChars != 0);
    }

    isCharValid(k) {

        if((k >= 'a' && k <= 'z') || (k >= 'A' && k <= 'Z') || (k >= '0' && k <= '9')) return true;

        const ALLOWED_SPECIAL_CHARS = ' _,.:+-=/?!()"\'#&@ěščřžýáíéúůĚŠČŘŽÝÁÍÉÚŮ';

        for(var i = 0; i < ALLOWED_SPECIAL_CHARS.length; i++){
            if(k === ALLOWED_SPECIAL_CHARS[i]) return true;
        }

        return false;
    }

    clearRepeatingSpecialChars(text) {
        var finalText = '';

        for(var i = 0; i < text.length; i++){
            const c = text[i];
            const c_last = text[i-1];

            if(c === ' ' || c === '_') {
                if(i == 0) continue;
                if(c !== c_last) finalText += c;
            } else {
                finalText += c;
            }
        }
        return finalText;
    }
}