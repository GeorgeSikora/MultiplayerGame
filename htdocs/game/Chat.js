
let chat;
/*
const CHAT_LINES = 10;
const CHAT_LINE_HEIGHT = 32;
const CHAT_TEXT_SIZE = 32;
*/

class Chat {
    constructor() {
        this.LINES = 6;
        this.LINE_HEIGHT = 24;
        this.TEXT_SIZE = 20;

        this.open = false;
        this.lines = [];

        this.textInput = '';
    }
    add(message) {
        this.lines.unshift(new Message(message));
        this.lines.splice(this.LINES);
    }
    draw(x,y){
        push();
        translate(x,y,100);
    
        textAlign(LEFT, BOTTOM);
        textSize(this.TEXT_SIZE);

        for(var i = 0; i < this.lines.length; i++){
            fill(0);
            text(this.lines[i].str, -1, -1);
            text(this.lines[i].str,  1,  1);
            fill(255);
            text(this.lines[i].str, 0, 0);
            translate(0,-this.LINE_HEIGHT);
        }
        pop();
    }
    keyPressed(){
        if(key === 'Enter') this.enter();

        if(!this.open || key.length != 1) return;
        const k = key.charAt(0);

        if((k > 'a' && k < 'z') || (k > 'A' && k < 'Z') || (k > '0' && k < '9')){
            this.textInput += k;
        }
    }
    keyReleased(){

    }
    enter(){
        if(this.open){
            this.add(this.textInput);
            this.textInput = '';
        }
        this.open = !this.open;
    }
}

class Message {
    constructor(message){
        this.str = this.getTime() +  ' ' + message;
    }
    getTime(){
        return hour().toString().padStart(2,'0') + ':' + minute().toString().padStart(2,'0');
    }
}