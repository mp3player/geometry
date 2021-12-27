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

    }
    on(eventName , handler){

    }
    off(eventName , handler){

    }
    trigger(eventName){

    }
}

export {EventListener,Event,MouseActionEvent,MouseMonitorEvent,MouseScrollEvent}