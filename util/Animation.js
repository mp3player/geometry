import { _Math } from '../math/Math.js';

//动画的基类，根据属性值的不断变化形成动画
class Animation {
    constructor(target , action , name = 'animation-0'){
        this.target = target ;
        this.action = action;
        this.name = name;
    }
    run(cb = () => {}){
        let actionName = this.action.props;
        let from = this.action.from ? this.action.from : this.target[actionName];
        let to = this.action.to //? this.action.to : this.target[actionName];
        let duration = this.action.duration ? this.action.duration : 100;
        let callback = this.action.callback ? (d) =>this.action.callback : (d) => {};


        let i = 0;
        let timer = setInterval(() =>{
            i += 1;
            let props = _Math.interplote(from , to , i / duration);
            this.target[actionName] = props;
            if(i >= duration){
                clearInterval(timer);
                callback(this.target)
                cb(this.target);
            }
        },1)
    }

    static Animate(target , action){
        /**
         * action : {from : status  , to : status , interval : time }
         */
        return new Animation(target , action);
    }
}




//路径动画，只有shape才能使用，考虑使用shape的位置还是偏移进行移动
class PathAnimation {
    constructor(shape , path , duration ){
        this.shape = shape;
        this.path = path;
        this.duration = duration;
    }
    run(){

    }
}

export {}