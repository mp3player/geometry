export default class Queue {
    constructor(){
        this.data = [];
        this.length = 0;
    }
    push(val){
        this.data.push(val);
        this.length += 1;
    }
    front(){
        if(this.isEmpty())
            return null;
        this.lenght -= 1;
        return this.data.shift();
    }
    isEmpty(){
        return this.length == 0;
    }
    forEach(fn){
        this.data.forEach(d => {
            fn(d)
        })
    }
}