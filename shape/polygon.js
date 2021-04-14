import Line from "./line.js";

export default class Polygon extends Line {
    render(pen){
        let T = this.T;
        this.setProps(pen);
        let v = T.c2s(this.points[0]);
        pen.moveTo(v.x,v.y);
        for(let i=1;i<this.points.length;++i){
            v = T.c2s(this.points[i]);
            pen.lineTo(v.x,v.y);
        }
        this.endClose(pen);
    }
}