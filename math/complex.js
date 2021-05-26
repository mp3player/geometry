import Vector from "./vector.js";

export default class Complex{
    constructor(r=0,i=0){
        this.r = r;
        this.i = i;
    }
    mod(){
        return Math.hypot(this.r,this.i);
    }
    normalize(){
        let mod = this.mod();
        if(mod == 0)
            return this;
        return new Complex(this.r / mod , this.i / mod);
    }
    scale(s){
        return new Complex(this.r * s,this.i * s);
    }
    add(c){
        return new Complex(this.r + c.r , this.i + c.i);
    }
    sub(c){
        return new Complex(this.r - c.r , this.i - c.i);
    }
    mul(c){
        return new Complex(this.r * c.r - this.i * c.i , this.r * c.i + this.i * c.r);
    }
    reverse(){
        return new Complex(-this.r , -this.i);
    }
    adjoint(){
        return new Complex(this.r , -this.i);
    }
    div(c){
        return this.mul(c.adjoint()).scale(1 / c.length());
    }
    toVector(){
        return new Vector(this.r,this.i);
    }
    toString(){
        return `r : ${this.r} , i : ${this.i}`
    }
}