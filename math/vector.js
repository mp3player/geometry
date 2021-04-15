import Complex from "./complex.js";

export default class Vector {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    add(vec){
        return new Vector(this.x + vec.x , this.y + vec.y);
    }
    sub(vec){
        return new Vector(this.x - vec.x , this.y - vec.y);
    }
    mul(vec){
        return new Vector(this.x * vec.x , this.y * vec.y);
    }
    scale(s){
        return new Vector(s,s).mul(this);
    }
    length(){
        return Math.hypot(this.x,this.y);
    }
    reverse(){
        return new Vector(-this.x,-this.y);
    }
    dot(vec){
        return this.x * vec.x + this.y * vec.y;
    }
    toComplex(){
        return new Complex(this.x,this.y);
    }
}