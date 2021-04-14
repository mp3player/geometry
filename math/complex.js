export default class Complex{
    constructor(r,i){
        this.r = r;
        this.i = i;
    }
    length(){
        return Math.hypot(this.r,this.i);
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
        return new Complex(this.r * c.r - this.i * c.i , this.r * c.i + vec.r * c.i);
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
}