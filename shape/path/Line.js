import { ShapeType } from "../../constant/Constant.js";
import Shape from "../Shape.js";

export default class line extends Shape {
    constructor(vertex){
        super();
        this.Type = ShapeType.LINE;
        this.Name = 'line';
        this.vertex = vertex;
    }
    applyTransform(transform){
        //计算顶点坐标
        let vert = [];
        for(let i=0;i<this.vertex.length;++i){
            let v = this.vertex[i];
            v = transform.applyTransform(v);
            vert.push(v);
        }   
        return vert;
    }
}