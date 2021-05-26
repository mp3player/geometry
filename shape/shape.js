import Box from "../box/Box.js";
import { Join } from "../constant/Constant.js";
import EventListener from "../event/EventListener.js";
import Vector from "../math/vector.js";
import Style from "../util/style.js";

export default class Shape extends EventListener {
    constructor(props){
        super();
        this.offset = new Vector(0,0);
        this.scale = new Vector(1,1);
        this.rotation = 0;
        this.props = new Style(props);
        this.index = 0;
        this.box = new Box(Infinity,-Infinity,-Infinity,Infinity);
    }
    //no scale and translate
    updateBox(vec){
        if(vec.x < this.box.lt.x){
            this.box.lt.x = vec.x;
        }
        if(vec.y > this.box.lt.y){
            this.box.lt.y = vec.y;
        }
        if(vec.x > this.box.rb.x){
            this.box.rb.x = vec.x;
        }
        if(vec.y < this.box.rb.y){
            this.box.rb.y = vec.y;
        }
    }
    isTouch(vec){
        return false;
    }
    setProps(pen){
        let props = this.props;
        pen.save();
        pen.beginPath();
        pen.fillStyle = props.background;
        pen.strokeStyle = props.borderColor;
        pen.lineWidth = props.borderWidth;
        pen.lineCap = props.join;
        pen.lineJoin = props.join;
    }
    endClose(pen){
        let props = this.props;
        if(props.borderColor){
            pen.closePath();
            pen.stroke();
        }
        if(props.background){
            pen.closePath();
            pen.fill();

        }
        pen.restore();
    }
    endProps(pen){
        let props = this.props;

        if(props.borderColor){
            pen.stroke();
        }
        if(props.background){
            pen.fill();
        }

        pen.closePath();

        pen.restore();
    }
    translate(x,y){
        this.offset = new Vector(x,y);
    }
    rotate(r){
        this.rotation = r;
    }
    zoom(sx,sy){
        this.scale = new Vector(sx,sy);
    }
    isTouch(vec){
        return false;
    }
}