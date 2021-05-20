import { ShapeType } from "../../constant/ConstantShape";
import Shape from "../shape.js";

export default class Curve extends Shape {
    constructor(x0,y0,x1,y1,x2,y2){
        this.type = ShapeType.CURVE;
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}