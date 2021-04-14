import { Color } from "../constant/ConstantColor.js";
import Vector from "../math/vector.js";
import line from "../shape/line.js";

export default class Axes{
    constructor(cx,cy){
        this.cx = cx;
        this.cy = cy;
    }
    render(pen){
        let x = new line([
            new Vector(-innerWidth/2,0),
            new Vector(innerWidth/2,0)
        ],{
            borderWidth:2,
            borderColor:Color.RED
        });
        let y = new line([
            new Vector(0,-innerHeight / 2),
            new Vector(0,innerHeight / 2)
        ],{
            borderWidth:2,
            borderColor:Color.GREEN
        });
        
        x.render(pen);
        y.render(pen);
    }
}