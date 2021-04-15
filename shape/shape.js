import Vector from "../math/vector.js";
import Style from "../util/style.js";

export default class Shape {
    constructor(props){
        this.offset = new Vector(0,0);
        this.scale = new Vector(1,1);
        this.rotation = 0;
        this.props = new Style(props);
        this.index = 0;
    }
    setProps(pen){
        let props = this.props;
        pen.save();
        pen.beginPath();
        pen.fillStyle = props.background;
        pen.strokeStyle = props.borderColor;
        pen.lineWidth = props.borderWidth;
        pen.lineCap = 'round';
        pen.lineJoin = "round";
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
    translate(x,y){
        this.offset = this.offset.add(new Vector(x,y));
    }
    rotate(r){
        this.rotation += r;
    }
    render(pen){
        
    }
}