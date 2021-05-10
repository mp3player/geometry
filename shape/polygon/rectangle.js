import Box from "../../box/Box.js";
import { ShapeType } from "../../constant/Constant.js";
import Vector from "../../math/vector.js";
import Shape from "../shape.js";

export default class Rectangle extends Shape {
    constructor(x,y,width,height,props){
        super(props);
        this.lt = new Vector(x,y);
        this.width = width;
        this.height = height;
        this.type = ShapeType.RECTANGLE;
        this.computeBox();
    }
    //no scale and translate
    computeBox(){
        let lt = this.lt.copy();
        let rt = lt.add(new Vector(this.width,0));
        let rb = rt.add(new Vector(0,-this.height));
        let lb = lt.add(new Vector(0,-this.height));

        this.updateBox(lt);
        this.updateBox(rt);
        this.updateBox(rb);
        this.updateBox(lb);
    }
}