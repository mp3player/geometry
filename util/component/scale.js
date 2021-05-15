import Helper from "./helper.js";
import T from '../transform.js';
import Vector from "../../math/vector.js";

/**
 * the component of the painter : scale
 */
export default class Scale extends Helper {
    constructor(fontSize = 15){
        super();
        this.fontSize = fontSize;
    }
    render(pen,origin,zoom,screen,coordinate){
        let start = new Vector(0,0);
        let end = new Vector(innerWidth,innerHeight);

        let c_start = T.s2c(origin);
        let c_end = T.s2c(end);
        console.log(c_start);

        let pos = T.c2s(origin);
        pen.save();
        pen.fillStyle = 'black';
        pen.font = this.fontSize + 'px sans-serif';
        pen.textAlign = 'center';
        for(let i = 0;i < innerWidth / 2;i += zoom){
            pen.fillText(i,i * zoom + pos.x ,pos.y  + this.fontSize);
        }
        for(let i = -zoom;i > -innerWidth / 2;i -= zoom){
            pen.fillText(i,i * zoom + pos.x,pos.y  + this.fontSize);
        }
        for(let i = zoom;i < innerHeight / 2; i += zoom){
            pen.fillText(i,pos.x + this.fontSize,pos.y + i * zoom);
        }
        for(let i = -zoom;i > -innerHeight / 2; i -= zoom){
            pen.fillText(i,pos.x + this.fontSize,pos.y + i * zoom);
        }
        // pen.closePath();
        pen.fill();
        pen.restore();

        
    }
}