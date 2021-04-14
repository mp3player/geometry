/**
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
        this.smooth = opt.smooth || true;
    }
}