import { _Math } from '../../math/Math.js';

/**
 * 可增加配置，参考css3 animation配置
 * 
 */
class Animation {
    constructor(target , action , name = 'animation-0'){
        this.target = target ;
        this.action = action;
        this.name = name;
    }
    run(cb = Animation.defaulCallback){
        let actionName = this.action.props;
        let from = this.action.from ? this.action.from : this.target[actionName];
        let to = this.action.to //? this.action.to : this.target[actionName];
        let duration = this.action.duration ? this.action.duration : 100;

        

        let i = 0;
        let timer = setInterval(() =>{
            i += 1;
            let props = _Math.interplote(from , to , i / duration);
            this.target[actionName] = props;
            if(i >= duration){
                clearInterval(timer);
            }
        },1)
    }

    static createAction(target , action){
        /**
         * action : {from : status  , to : status , interval : time }
         */
        return new Animation(target , action);
    }

    static defaulCallback(target) {
        console.log('animation finished');
    }
}

//路径动画，只有shape才能使用，考虑使用shape的位置还是偏移进行移动
class PathAnimation {
    constructor(shape , path , duration = 100 ){
        this.shape = shape;
        this.path = path;               //一个path实例，必须实现路径分割的方法
        this.duration = duration;
    }
    run(cb = Animation.defaulCallback){
        let i = 0;
        let timer = setInterval(() =>{
            i += 1;
            if(i >= duration){
                clearInterval(timer);
                cb(this.target);
            }
        },1)
    }
}


export {Animation , PathAnimation}