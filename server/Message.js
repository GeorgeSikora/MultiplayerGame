class Message {
    constructor(message, player){
        if(player == null) 
            this.str = '&9' + this.getTime() + ' &1 ' + message;
        else
            this.str = '&9' + this.getTime() + ' &' + Message.getColorToken(player.col) + player.name + '&1 ' + message;
    }
    getTime(){// current hours
        const date_ob = new Date();
        const hours = date_ob.getHours();
        
        // current minutes
        const minutes = date_ob.getMinutes();
        return hours.toString().padStart(2,'0') + ':' + minutes.toString().padStart(2,'0');
    }
    static getColorToken(id){
        switch(id){
            case 'black':     return '0';
            case 'white':  return '1';
            case 'red':     return '2';
            case 'orange':  return '3';
            case 'yellow':  return '4';
            case 'green':   return '5';
            case 'aqua':    return '6';
            case 'blue':    return '7';
            case 'purple':  return '8';
        }
    }
}

module.exports = Message;