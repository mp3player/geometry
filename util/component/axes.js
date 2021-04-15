import { Color } from "../../constant/ConstantColor.js";
import Vector from "../../math/vector.js";
import line from "../../shape/path/line.js";

export default class Axes{
    constructor(cx,cy){
        this.cx = cx;
        this.cy = cy;
        this.xLine = new line([
            new Vector(-innerWidth/2,0),
            new Vector(innerWidth/2,0)
        ],{
            borderWidth:2,
            borderColor:Color.RED
        });
        this.yLine = new line([
            new Vector(0,-innerHeight / 2),
            new Vector(0,innerHeight / 2)
        ],{
            borderWidth:2,
            borderColor:Color.GREEN
        });
    }
    setOrigin(x,y){
        this.xLine.setOrigin(x,y);
        this.yLine.setOrigin(x,y);
    }
    render(pen){
        
        
        this.xLine.render(pen);
        this.yLine.render(pen);
    }
}