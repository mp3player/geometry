import Vector from "../math/Vector.js";

class EventListener {
    constructor(){
        this.events = {};
        this.drag = false;      //一旦可拖拽，那么之后的所有事件都不会被触发，暂不考虑事件冒泡
    }

    on(eventName , handler){
        this.events[eventName] = handler;
    }

    off(eventName ){
        delete this.events[eventName];
    }

    once(eventName){

    }
    
    trigger(eventName , e){
        if(this.events[eventName]){
            let event = this.events[eventName];
            event.bind(this)(e);
        }
    }

}

class Event {

    constructor(oe){
        this.Type = Event.PLAIN_EVENT;
        this.originEvent = oe;
        this.path = [];
        this.target = null;
        this.bubble = true;
    }

    static UNKNOW               =       'know';
    static PLAIN_EVENT          =       'event';
    static MOUSE_PRESS_EVENT    =       'mousedown';
    static MOUSE_MOVE_EVENT     =       'mousemove';
    static MOUSE_REALEASE_EVENT =       'mouseup';
    static MOUSE_OVER_EVENT     =       'mouseover';
    static MOUSE_ENTER_EVENT    =       'mouseenter';
    static MOUSE_OUT_EVENT      =       'mouseout';
    static DRAG_EVENT           =       'drag';
}


//mouse action including press , move , release 
class MouseEvent extends Event {
    constructor(oe){
        super(oe);
        this.init();
    }
    init(){
        //set the event type;
        switch(this.originEvent.type){
            case 'mousedown':{
                this.Type = Event.MOUSE_PRESS_EVENT;
            }break;
            case 'mousemove':{
                this.Type = Event.MOUSE_MOVE_EVENT;
            }break;
            case 'mouseup':{
                this.Type = Event.MOUSE_REALEASE_EVENT;
            }break;
        };
    }
}

class EventManager {
    constructor(event){
        this.originEvent = event;
    }
    getEvent(){
        return this.originEvent;
    }
    getScreen(){
        return new Vector(this.originEvent.x,this.originEvent.y);
    }
    getEventType(){
        return this.originEvent.type;
    }
}




export {EventListener,MouseEvent,Event,EventManager}