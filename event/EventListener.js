import Vector from "../math/vector.js";

export default class EventListener {
    constructor(){

        this.mousePress = false;
        this.mouseLPress = false;
        this.mouseMPress = false;
        this.mouseRPress = false;

        this.timer = null;
        
        this.mouse = new Vector(0,0);

        this.listeners = {
            onPress    :   null,
            onRealse   :   null,
            onClick    :   null,
            onMove     :   null,
            onZoom     :   null,
            onDrag     :   null,
        }
    }
    on(name,callback){
        this.listeners[name] = callback;
    }
    trigger(name,event){
        if(this.listeners[name] != null){
            this.listeners[name](event);
        }
    }
    remove(name){
        this.listeners[name] = null;
    }
}