class Event {
    constructor(){
        this.target = null;
        this.path = null;
    }

    static MOUSE_PLAIN      =       'plain';
    static MOUSE_PRESS      =       'press';
    static MOUSE_MOVE       =       'move';
    static MOUSE_RELEASE    =       'realse';
    static MOUSE_SCROLL     =       'scroll';
    
}

class MouseActionEvent extends Event{
    constructor(){
        super();
    }
}

class MouseMonitorEvent extends Event{
    constructor(){
        super();
        this.Type = Event.MOUSE_MOVE;
    }
}

class MouseScrollEvent extends Event{
    constructor(){
        super();
        this.Type = Event.MOUSE_SCROLL;
    }
}

class EventListener {
    constructor(){
        this.events = {};
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

export {EventListener,Event,MouseActionEvent,MouseMonitorEvent,MouseScrollEvent}