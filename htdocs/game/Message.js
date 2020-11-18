class Message {
    constructor(){
        this.str = '';
        this.timeout = millis() + CHAT_MESSAGE_DURATION;
        this.opacity = 255;
    }
    name(){
        this.str += '&' + getColorToken(player.colorID) + player.name + ' &r';
        return this;
    }
    time(){
        this.str +='&9[' + this.getTime() + '] &r';
        return this;
    }
    message(text){
        this.str += text;
        return this;
    }
    build(){
        this.buildImage(); 
        return this;
    }
    getTime(){
        return hour().toString().padStart(2,'0') + ':' + minute().toString().padStart(2,'0');
    }
    buildImage(){

        textSize(chat.TEXT_SIZE);
        var strWidth = 0;
        for(var i = 0; i < this.str.length; i++){
            if(this.str[i] != '&') {
                strWidth += textWidth(this.str[i]);
            } else {
                i++;
            }
        }

        var img = createGraphics(strWidth, chat.LINE_HEIGHT);
        
        img.textAlign(LEFT, TOP);
        img.textSize(chat.TEXT_SIZE);
        img.stroke(0);
        img.strokeWeight(3);
        img.translate(0, (chat.LINE_HEIGHT - chat.TEXT_SIZE)/2);
        console.log((chat.LINE_HEIGHT - chat.TEXT_SIZE)/2);

            var token = {color: WHITE};
            for (var k = 0; k < this.str.length; k++) {
                while(this.str.charAt(k) === '&' && k < this.str.length){
                    token = chat.useToken(this.str.charAt(k=k+1), token);
                    k++;
                }
                var c = this.str.charAt(k);
                if(token.crazyText) c = char(random(256));

                img.fill(token.color);
                img.text(c, 0, 0);
                img.translate(img.textWidth(c),0);
            }

        //saveCanvas(img);
        this.img = img;
    }
}
