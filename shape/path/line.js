import { ShapeType } from "../../constant/Constant.js";
import Shape from "../shape.js";

export default class line extends Shape {
    constructor(points,props){
        super(props);
        this.type = ShapeType.LINE;
        this.points = points;
        this.computeBox()
    }
    //no scale and translate
    computeBox(){
        let p = this.points;
        for(let i=0;i<p.length;++i){
            let v = p[i];
            this.updateBox(v);
        }
    }
}