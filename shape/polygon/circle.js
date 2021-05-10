import Shape from "../shape.js";
import Vector from "../../math/vector.js";
import { ShapeType } from "../../constant/Constant.js";
import Box from "../../box/Box.js";

export default class Circle extends Shape {
    constructor(x=0,y=0,r=1,props){
        super(props);
        this.type = ShapeType.CIRCLE;
        this.center = new Vector(x,y);
        this.r = r;
        this.computeBox();
    }
    //no scale and translate
    computeBox(){
        let lt = this.center.copy().sub(new Vector(this.r,-this.r));
        let rb = this.center.copy().add(new Vector(this.r,this.r));

        this.box = new Box(lt.x,lt.y,rb.x,rb.y);
    }
    //extends from Shape
    isTouch(vec){
        
    }
    //extends from EventListener
    trigger(name,e){

    }
}