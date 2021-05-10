import Vector from "../math/vector.js";

export default class Box {
    constructor(x0=0,y0=0,x1=0,y1=0){
        this.lt = new Vector(x0,y0);
        this.rb = new Vector(x1,y1);
    }
}