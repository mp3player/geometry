import { Polynomial } from "../../constant/Constant.js";
import ConstantExpression from "./expression.js";
import PolyFunction from "./function.js";

export default class LinearExpression extends PolyFunction {
    constructor(k,b){
        super()
        this.k = k;
        this.b = b;
        this.type = Polynomial.LINEAR;
    }
    getValue(x){
        return this.k * x + this.b;
    }
    getDifferential(){
        return new ConstantExpression(k);
    }
}