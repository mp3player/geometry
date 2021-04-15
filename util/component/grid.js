import { Color } from "../../constant/ConstantColor.js";
import Vector from "../../math/vector.js";
import line from "../../shape/path/line.js";

import T from '../transform.js'
import Helper from "./helper.js";

export default class Grid extends Helper {
    constructor(sx,sy){
        super();
        this.sx = sx;
        this.sy = sy;

    }
    render(pen,origin){
        
    }
}