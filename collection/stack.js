
export default class Stack {
    constructor(){
        this.data = [];
        this.length = 0;
    }
    push(val){
        this.data.push(val);
        this.length += 1;
    }
    top(){
        if(this.isEmpty())
            return null;
        this.length -= 1;
        return this.data.pop();
    }
    isEmpty(){
        return this.length == 0;
    }
    empty(){
        this.data = [];
        this.length = 0;
    }
    forEach(cb){
        this.data.forEach(d => {
            cb(d)
        })
    }
}