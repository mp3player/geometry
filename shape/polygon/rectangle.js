import { ShapeType } from "../../constant/ConstantShape.js";
import Vector from "../../math/vector.js";
import Shape from "../shape.js";

export default class Rectangle extends Shape {
    constructor(x,y,width,height,props){
        super(props);
        this.lt = new Vector(x,y);
        this.width = width;
        this.height = height;
        this.type = ShapeType.RECTANGLE;
    }
}