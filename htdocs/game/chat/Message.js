
class Message {
    constructor() {
        this.str = '';
        this.timeout = millis() + Chat.MESSAGE_DURATION;
        this.opacity = 255;
    }
    time() {
        this.str +='&9' + this.getTime() + ' &r';
        return this;
    }
    getTime() {
        return hour().toString().padStart(2,'0') + ':' + minute().toString().padStart(2,'0');
    }
    name() {
        this.str += '&' + getColorToken(player.team) + player.name + ' &r';
        return this;
    }
    message(text) {
        this.str += text;
        return this;
    }
    build() {
        this.buildImage(); 
        return this;
    }
    buildImage() {

        textSize(Chat.TEXT_SIZE);
        var strWidth = 0;
        for(var i = 0; i < this.str.length; i++){
            if(this.str[i] != '&') {
                strWidth += textWidth(this.str[i]);
            } else {
                i++;
            }
        }

        var img = createGraphics(strWidth, Chat.LINE_HEIGHT);
        
        img.textAlign(LEFT, TOP);
        img.textSize(Chat.TEXT_SIZE);
        img.stroke(0);
        img.strokeWeight(3);
        img.translate(0, (Chat.LINE_HEIGHT - Chat.TEXT_SIZE)/2);

        var token = {color: WHITE};
        for (var k = 0; k < this.str.length; k++) {
            while(this.str.charAt(k) === '&' && k < this.str.length) {
                token = this.useToken(this.str.charAt(k=k+1), token);
                k++;
            }
            var c = this.str.charAt(k);
            if(token.crazyText) c = char(random(256));

            img.fill(token.color);
            img.text(c, 0, 0);
            img.translate(img.textWidth(c),0);
        }

        this.img = img;
        img.remove();
    }

    useToken(param, token) {
        switch(param) {
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