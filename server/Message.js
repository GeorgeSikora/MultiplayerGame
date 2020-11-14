class Message {
    constructor(message,name){
        if(name == null) 
            this.str = '[' + this.getTime() + '] ' + message;
        else
            this.str = '[' + this.getTime() + '] ' + name + ': ' + message;
    }
    getTime(){// current hours
        const date_ob = new Date();
        const hours = date_ob.getHours();
        
        // current minutes
        const minutes = date_ob.getMinutes();
        return hours.toString().padStart(2,'0') + ':' + minutes.toString().padStart(2,'0');
    }
}

module.exports = Message;