class Message {
    constructor(message,player){
        if(player == null) 
            this.str = '&9[' + this.getTime() + ']&1 ' + message;
        else
            this.str = '&9[' + this.getTime() + '] &' + this.getColorToken(player.colorID) + player.name + '&1 ' + message;
    }
    getTime(){// current hours
        const date_ob = new Date();
        const hours = date_ob.getHours();
        
        // current minutes
        const minutes = date_ob.getMinutes();
        return hours.toString().padStart(2,'0') + ':' + minutes.toString().padStart(2,'0');
    }
    getColorToken(id){
        switch(id){
            case '0': return '2';
            case '1': return '3';
            case '2': return '4';
            case '3': return '5';
            case '4': return '6';
            case '5': return '7';
            case '6': return '8';
        }
    }
}

module.exports = Message;