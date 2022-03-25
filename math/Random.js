export default class Random{
    static rInt(min,max){
        return Math.floor(Math.random() * (max - min)) + min;
    }
    static rFloat(min,max){
        return Math.random() * (max - min) + min;
    }
    static rand(){
        return Math.random();
    }

}