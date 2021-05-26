import { Join } from "../constant/Constant.js";
import {Color} from '../shape/image/image.js'

/**
 * common drawing properties
 * 
 * background 
 *  
 * border
 * borderColor
 * border-radius
 * font-family
 * 
 * 
 */
export default class Style {
    constructor(opt={}){
        this.background = opt.background;
        // this.color = opt.color;
        this.borderColor = opt.borderColor ? opt.borderColor : Color.BLACK;
        this.borderRadius = opt.borderRadius || 0;
        this.borderWidth = opt.borderWidth || 1;
        this.join = opt.join || Join.MITER;
    }
}