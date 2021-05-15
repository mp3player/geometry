import { ShapeType } from "../../constant/Constant.js";
import { Color } from "../../shape/image/image.js";
import T from "../transform.js";
import Helper from "./helper.js";

export default class Cursor extends Helper{
    constructor(){
        super();
    }
    render(pen,origin,zoom,mouse,coordinate){
        let screen = mouse;

        pen.save();
        pen.lineDashOffset = [4,4];
        pen.strokeStyle = Color.BLACK3;
        //verticle
        pen.moveTo(0,screen.y);
        pen.lineTo(innerWidth,screen.y);
        pen.stroke();
        pen.closePath();

        //horizontal
        pen.moveTo(screen.x,0);
        pen.lineTo(screen.x,innerHeight);
        pen.stroke();
        pen.closePath();

        pen.strokeStyle = Color.BLACK;
        pen.font = '20px sans-serif';
        // console.log(pen)
        let str = 'x : ' + coordinate.x.toFixed(2) + ' y : ' + coordinate.y.toFixed(2);
        pen.fillText(str,mouse.x + 5,mouse.y - 5)


        pen.restore();
    }
}