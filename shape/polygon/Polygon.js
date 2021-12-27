import Shape from "../Shape.js";

export default class Polygon extends Shape {
    constructor(vertex,style){
        super(style);
        this.Name = 'polygon';
        this.vertex = vertex;
        this.Type = Shape.POLYGON;
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