import { Polynomial } from "../../constant/Constant.js";
import PolyFunction from "./function.js";



export default class ConstantExpression extends PolyFunction {
    constructor(b){
        this.b = b;
        this.type = Polynomial.CONSTANT;
    }
    getValue(x){
        return this.b;
    }
    getDifferential(){
        return 
    }
}