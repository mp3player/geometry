import Vector from "../math/vector.js";
import Style from "../util/style.js";
import Transform from '../util/transform.js'

export default class Shape {
    constructor(props){
        this.center = new Vector(0,0);
        this.scale = new Vector(1,1);
        this.props = new Style(props);
        this.T = Transform;
    }
    setProps(pen){
        let props = this.props;
        pen.save();
        pen.beginPath();
        pen.fillStyle = props.background;
        pen.strokeStyle = props.borderColor;
        pen.lineWidth = props.borderWidth;
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
            pen.closePath();
        }
        if(props.background){
            pen.fill();
            pen.closePath();
        }
        pen.restore();
    }
    translate(t){

    }
    rotate(r){

    }
    scale(s){

    }
}