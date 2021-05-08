import { Polynomial } from "../../constant/ConstantPolynomial.js";
import PolyFunction from "./function.js";
import LinearExpression from "./linear-expression.js";

export default class SquareExpression extends PolyFunction {
    constructor(a=0,b=0,c=0){
        super()
        this.a = a;
        this.b = b;
        this.c = c;
        this.type = Polynomial.SQUARE;
    }
    getValue(x){
        return this.a * x * x + this.b * x + this.c;
    }
    getDifferential(){
        return new LinearExpression(2 * this.a,b);
    }
    
}