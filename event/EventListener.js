import Vector from "../math/vector.js";

export default class EventListener {
    constructor(){

        this.mousePress = false;
        this.mouseLPress = false;
        this.mouseMPress = false;
        this.mouseRPress = false;

        this.timer = null;
        
        this.mouse = new Vector(0,0);
        //the mouse position of the screen
        this.screen = new Vector(0,0);
        //the mouse position of the coordinate
        this.coordinate = new Vector(0,0);

        this.listeners = {
            click    :   null,
        }

    }
    on(name,callback){
        this.listeners[name] = callback;
        // callback.bind(this)
    }
    trigger(name,event){
        if(this.listeners[name] != null){
            this.listeners[name].bind(this)(event)
            // this.listeners[name](event);
        }
    }
    remove(name){
        this.listeners[name] = null;
    }
}