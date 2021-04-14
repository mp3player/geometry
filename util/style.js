import { Join } from "../constant/ConstantJoin.js";

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
        this.background = opt.background ;
        // this.color = opt.color;
        this.borderColor = opt.borderColor || null ;
        this.borderRadius = opt.borderRadius || 0;
        this.borderWidth = opt.borderWidth || 1;
        this.join = opt.join || Join.MITER;
    }
}