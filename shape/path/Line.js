import Shape from "../Shape.js";
import { Path } from "./Path.js";

export default class line extends Path {
    constructor(v0,v1,props){
        super(props);
        this.Type = Shape.LINE;
        this.Name = 'line';
        this.start = v0;
        this.end = v1;
    }
    applyTransform(transform){
        //计算顶点坐标
        let start = transform.applyTransform(this.start);
        let end = transform.applyTransform(this.end);            
        return [start,end];
    }
}