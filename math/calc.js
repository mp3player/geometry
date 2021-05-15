export default class Calc {
    static sgn(value){
        return value > 0 ? 1 : -1;
    }
    static maxPrecise = 0.00000000000001;
    static minPrecise = .01;
    static defaultPrecise = 0.00000000000001
    static precise = 0.00000000000002;
    static E = 0;
    static exp(x){

        let value = 1;
        let iteration = 1;
        while(value > Calc.precise){
            value = Math.pow(x,iteration) / Calc.level(iteration)
            iteration += 1;
        }

        let sum = 0;
        for(let i=1;i<iteration;++i){
            sum += Math.pow(x,i) / Calc.level(i);
        }
        //Talor formula
        sum = Calc.clip(sum);

        return sum;
    }
    static clip(value){
        let len = Calc.precise;
        console.log(1 / len);
        return value;
    }
    static level(n){
        let integrate = 1;
        for(let i=2;i<n;++i){
            integrate *= i;
        }
        return integrate;
    }
}