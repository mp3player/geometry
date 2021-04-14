import Stack from "./stack.js";

export default class Express {
    constructor(exp){
        this.exp = exp;
    }
    //return that if the level of the o1 is higher than the o2
    compareOperation(o1,o2){
        if(o1 == '#')
            return -1;
        else if(o2 == '#')
            return 1;
        else if(o1 == '+' || o1 == '-' && o2 == '*' || o2 == '/'){
            return -1;
        }else if(o1 == '*' || o1 == '/' && o2 == '+' || o2 == '-'){
            return 1;
        }else {
            return 0;
        }
    }
    //return the value of v1 and v2 with o
    calc(v1,v2,o){
        v1 = v1 * 1;
        v2 = v2 * 1;
        switch(o){
            case '+':{
                let v = v1 + v2;
                return v;
            };
            case '-':{
                let v = v1 - v2;
                return v;
            };
            case '*':{
                let v = v1 * v2;
                return v;
            }
            case '/':{
                if(v2 != 0){
                    let v = v1 / v2;
                    return v;
                }
            }
        }
    }
    //calculate the expression
    getVal(){
        console.log(this.exp);

        let exp = this.exp;
        let num = new Stack();
        let ope = new Stack();
        ope.push('#');
        //the firset    :   clean the blank char
        let str = '';
        for(let i=0;i<exp.length;++i){
            if(exp[i] != ' '){
                str += exp[i]
            }
        }
        // let numbers = [];
        // let operations = [];
        
        //the second    :   split the charactor into numbers or operations
        let subExpress = new Stack();
        let next = '';
        for(let i=0;i<str.length;++i){
            let c = str[i];
            
            if(c <= 9 && c >= 0 || c == '.'){
                next += c;
            }else{
                // numbers.push(next);
                //push the number into the stack
                
                num.push(next);
                next = '';
                
                //compare the top of the operation with the next 
                //if the level of the next is higher than the top of the stack , push the operation into the queue
                //or out the operation from the stack , 

                let op = ope.top();
                
                let res = this.compareOperation(c,op);
                if(res == 1){
                    ope.push(op);
                    ope.push(c);
                }else{
                    while(res == -1 && !op != '#'){
                        let n1 = num.top();
                        let n2 = num.top();
                        let val = this.calc(n2,n1,op);
                        num.push(val);
                        op = ope.top();
                        console.log(ope)
                        res = this.compareOperation(c,op);
                    }
                    ope.push(op);
                    ope.push(c);
                }
            }
        }
        num.push(next);

        let op = ope.top();

        while(op != '#'){
            let n1 = num.top();
            let n2 = num.top();
            let val = this.calc(n2,n1,op);

            num.push(val);
            op = ope.top();
        }
        return num.top();

    }
}