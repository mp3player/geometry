import T from '../transform.js'
import Helper from "./helper.js";

export default class Axes extends Helper{
    constructor(cx,cy){
        super();
        this.cx = cx;
        this.cy = cy;
        
    }
    render(pen,origin,zoom){
        
        
        let o = T.c2s(origin);
        pen.save();
        pen.lineWidth = 2;
        pen.beginPath();
        pen.strokeStyle = this.cx;
        pen.moveTo(0,o.y);
        pen.lineTo(innerWidth,o.y);
        pen.stroke();
        pen.closePath();
        pen.restore();

        pen.save();
        pen.lineWidth = 2;
        pen.beginPath();
        pen.strokeStyle = this.cy;
        pen.moveTo(o.x,0);
        pen.lineTo(o.x,innerHeight);
        pen.stroke();
        pen.closePath();
        pen.restore();
    }
}