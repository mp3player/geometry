export default class MaxPriorityQueue {
    constructor(key){
        this.queue = new Array();
        this.count = 0;
        this.key = key;
    }
    shiftDown(k){
        let key = this.key;
        while(k * 2 + 1 < this.count - 1){
            let i = k * 2 + 1;
            if(i + 1 < this.count - 1 && this.queue[i + 1][key] > this.queue[i][key]){
                i = i + 1;
            }
            if(this.queue[k][key] > this.queue[i][key])
                return ;
            let o = this.queue[k];
            this.queue[k] = this.queue[i];
            this.queue[i] = o;
            k = i;
        }
    }
    shiftUp(k){
        /**
         * parent = Number.parseInt((k - 1) / 2)
         */
        let key = this.key;
        while( k > 0 ){
            let p = Number.parseInt((k - 1) / 2);
            if(this.queue[k][key] < this.queue[p][key])
                return ; 
            let o = this.queue[k];
            this.queue[k] = this.queue[p];
            this.queue[p] = o;
            k = p;
        } 
    }
    getFirst(){
        if(this.count <= 0)
            return null;
        let o = this.queue[0];
        this.queue[0] = this.queue[this.count - 1];
        this.shiftDown(0);
        this.queue.pop();
        this.count -= 1;
        return o;
    }
    push(value){
        this.queue.push(value);
        this.shiftUp(this.count);
        this.count += 1;
    }
    isEmpty(){
        return this.count <= 0;
    }
}