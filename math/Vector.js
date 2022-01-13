import Complex from "./Complex.js";

export default class Vector {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    normalize(){
        let len = Math.hypot(this.x,this.y);
        return new Vector(
            this.x / len,
            this.y / len
        );
    }
    equal(vec){
        return this.x == vec.x && this.y == vec.y;
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
    rotate(angle){
        let complex = new Complex(Math.cos(angle),Math.sin(angle));
        let _this = this.toComplex();
        return _this.mul(complex).toVector();
    }
    scale(sx,sy){
        if(!sy)
            sy = sx;
        return new Vector(sx,sy).mul(this);
    }
    length(){
        return Math.hypot(this.x,this.y);
    }
    squaLength(){
        return this.x * this.x + this.y * this.y;
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
    copy(){
        return new Vector(this.x,this.y);
    }
    toString(){
        return `[x : ${this.x} , y : ${this.y}]`
    }
}