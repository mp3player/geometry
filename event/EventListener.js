import Vector from "../math/vector.js";

export default class EventListener {
    constructor(){
        this.mousePress = false;
        this.mouseLPress = false;
        this.mouseRPress = false;
        this.mouse = new Vector(0,0);
        this.timer = null;
    }
}