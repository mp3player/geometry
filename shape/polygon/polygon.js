import { ShapeType } from "../../constant/Constant.js";
import Shape from "../shape.js";

export default class Polygon extends Shape {
    constructor(points,props){
        super(props);
        this.points = points;
        this.type = ShapeType.POLYGON;
        this.computeBox();
    }
    computeBox(){
        for(let i=0;i<this.points.length;++i){
            this.updateBox(this.points[i]);
        }
    }
}