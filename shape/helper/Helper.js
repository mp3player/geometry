import Shape from "../Shape.js"

//装饰器
class Helper extends Shape {
    constructor(){
        super();
        this.Type = Shape.HELPER;
    }
}

export {Helper}