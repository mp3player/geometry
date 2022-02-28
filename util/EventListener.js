class EventListener {
    constructor(){
        this.events = {};
        this.dragable = false;
    }
    on(eventName , handler){
        this.events[eventName] = handler;
    }

    off(eventName , handler){
        delete this.events[eventName];
    }
    
    trigger(eventName , e){
        if(this.events[eventName]){
            this.events[eventName](e);
        }
    }
}

export {EventListener}