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

class Style {
    constructor(){
        this.Type = Style.COMMON;
    }
    static      COMMON      =   'commonStyle';
    static      STROKE      =   'strokeStyle';
    static      FILL        =   'fillStyle';
    static      TEXT        =   'textStyle';
    static Join = {
        MITER       :   'miter',
        ROUND       :   'round',
        BEVEL       :   'bevel'
    };

    copy(){}
    
}

class StrokeStyle extends Style{
    constructor(props={}){
        super();
        this.Type = Style.STROKE;
        this.borderColor = props.borderColor ? props.borderColor : Color.BLACK;
        this.borderWidth = props.borderWidth || 1;
        this.join = props.join || Style.Join.MITER;
    }
    //对属性就行拷贝
    copy(){
        return new StrokeStyle({
            borderColor:this.borderColor,
            borderWidth:this.borderWidth,
            join:this.join
        })
    }
}

class FillStyle extends StrokeStyle{
    constructor(props){
        super(props);
        this.Type = Style.FILL;
        this.background = props.background ? props.background : Color.TRANSPARENT;
        this.borderRadius = props.borderRadius || 0;
    }
}

class TextStyle extends Style{
    constructor(){
        super();
        this.Type = Style.TEXT;
    }
}

export {Style,StrokeStyle,FillStyle,TextStyle}