import { ShapeType } from "../../constant/ConstantShape.js";
import Shape from "../shape.js";

export default class line extends Shape {
    constructor(points,props){
        super(props);
        this.type = ShapeType.LINE;
        this.points = points;
    }
}