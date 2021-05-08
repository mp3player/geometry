import PolyFunction from "./function.js";

export default class PolynomialExpression extends PolyFunction{
    constructor(coef){
        super()
        this.coef = coef;
    }
    getValue(x){
        let coef = this.coef;
        let len = coef.length;
        let sum = 0;
        coef.forEach(d => {
            sum += d * Math.pow(x,--len);
        })
        return sum;
    }
    getDifferential(){
        return 
    }
}