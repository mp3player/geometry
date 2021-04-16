import Shape from "../shape.js";
import Vector from "../../math/vector.js";
import { ShapeType } from "../../constant/ConstantShape.js";

export default class Circle extends Shape {
    constructor(x,y,r,props){
        super(props);
        this.type = ShapeType.CIRCLE;
        this.center = new Vector(x,y);
        this.r = r;
    }
    //extends from Shape
    isTouch(vec){
        
    }
    //extends from EventListener
    trigger(name,e){

    }
}