import Vector from '../../math/vector.js';
import T from '../transform.js'
import Helper from "./helper.js";

export default class Axes extends Helper{
    constructor(cx,cy,fontSize=15){
        super();
        this.cx = cx;
        this.cy = cy;
        this.fontSize = fontSize;
    }
    
    render(pen,origin,zoom,screen,coordinate){
        let o = T.c2s(origin);
        pen.save();
        pen.lineWidth = .5 * Math.sqrt(zoom);
        pen.beginPath();
        pen.strokeStyle = this.cx;
        pen.moveTo(0,o.y);
        pen.lineTo(innerWidth,o.y);
        pen.stroke();
        pen.closePath();
        pen.restore();

        pen.save();
        pen.lineWidth = .5 * Math.sqrt(zoom);
        pen.beginPath();
        pen.strokeStyle = this.cy;
        pen.moveTo(o.x,0);
        pen.lineTo(o.x,innerHeight);
        pen.stroke();
        pen.closePath();
        pen.restore();



        //screen to coordinate
        //left and top
        // let start = new Vector(0,0);
        //transform the left to the coordinate
        // let c_start = T.s2c_t(start,origin,zoom)

        //transform the coordinate to the screen
        // let pos = T.c2s_t(start,origin,zoom);
        // console.log(pos.x,c_start.x)

        // console.log(c_start);

        // console.log(T.s2c_t(c_start,origin,zoom),origin)

        // pen.save();
        // pen.fillStyle = 'black';
        // pen.font = this.fontSize + 'px sans-serif';
        // pen.textAlign = 'center';
        // pen.baseLine = 'vertical'
        
        // for(let i = c_start.x;i < innerWidth / 2;i += zoom){
        //     pen.fillText(i,i * zoom + pos.x ,pos.y  + this.fontSize);
        // }

        // pen.fill();
        // pen.restore();

        
    }
}