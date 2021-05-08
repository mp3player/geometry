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
            press    :   null,
            realse   :   null,
            click    :   null,
            move     :   null,
            zoom     :   null,
            drag     :   null,
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