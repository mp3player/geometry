import Helper from "./helper.js";
import T from '../transform.js';
import {Color} from '../../constant/ConstantColor.js'

export default class Grid extends Helper {
    constructor(sx,sy){
        super();
        this.sx = sx;
        this.sy = sy;

    }
    render(pen,origin,zoom){
        let sx = this.sx * zoom;
        let sy = this.sy * zoom;
        let o = T.c2s(origin);

        //x axis
        pen.save();
        pen.lineWidth =2;
        pen.strokeStyle = Color.XAXES;
        pen.beginPath();

        for(let i=o.y;i<innerHeight;i+=sy){  
            pen.moveTo(0,i);
            pen.lineTo(innerWidth,i);
        }

        for(let i=o.y;i>0;i-=sy){
            pen.moveTo(0,i);
            pen.lineTo(innerWidth,i);
            
        }
        pen.stroke();
        pen.closePath();
        pen.restore();

        //y axis
        pen.save();
        pen.lineWidth = 2;
        pen.beginPath();
        pen.strokeStyle = Color.YAXES;

        for(let i=o.x;i<innerWidth;i+=sx){
            pen.moveTo(i,0);
            pen.lineTo(i,innerHeight);
        }

        for(let i=o.x;i>0;i-=sx){
            pen.moveTo(i,0);
            pen.lineTo(i,innerHeight);
            
        }
        pen.stroke();
        pen.closePath();
        pen.restore();

    }
}