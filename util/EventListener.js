class Event {
    constructor(){
        this.target = null;
        this.path = [];
        this.MOUSE_PRESS = false;
    }
}

class MouseActionEvent extends Event{
    constructor(){
        super();
        this.path = [];
    }
}

class MouseMonitorEvent extends Event{
    constructor(){
        super();
    }
}


class EventListener {
    constructor(){
        this.events = {};
        this.post = false;          //whether post the signal to the parent;
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

export {EventListener,Event,MouseActionEvent,MouseMonitorEvent}