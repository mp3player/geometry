import Shape from "./shape.js";

export default class line extends Shape {
    constructor(points,props){
        super(props)
        this.points = points;
    }
    render(pen){
        let T = this.T ;
        this.setProps(pen);
        super.render(pen);
        let v = T.c2s(this.points[0]).add(this.offset);
        pen.moveTo(v.x,v.y);
        for(let i=1;i<this.points.length;++i){
            v = T.c2s(this.points[i]).add(this.offset);
            pen.lineTo(v.x,v.y);
        }
        this.endProps(pen);
    }
}