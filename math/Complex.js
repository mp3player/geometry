import Vector from "./Vector.js";

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
    conj(){
        return new Complex(this.r , -this.i);
    }
    div(c){
        return this.mul(c.conj()).scale(1 / c.length());
    }
    arg(){
        let com = this.normalize();
        // console.log(com)
        let x = com.r , y = com.i;
        if(x == 0 && y > 0){
            return Math.PI / 2;
        }else if(x == 0 && y < 0){
            return -Math.PI / 2;
        }else{
            let tan = y / x ;
            let a = Math.atan(tan);
            if      (x < 0 && y < 0){
                return a - Math.PI;
            }else if(x < 0 && y > 0){
                return a + Math.PI;
            }else if(x > 0 && y > 0){
                return a;
            }else {
                return a;
            }
        }
        
    }
    toVector(){
        return new Vector(this.r,this.i);
    }
    toString(){
        return `r : ${this.r} , i : ${this.i}`
    }
}