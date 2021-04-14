import Shape from "../shape.js";
import Vector from "../../math/vector.js";

export default class Circle extends Shape {
    constructor(x,y,r,props){
        super(props);
        this.pos = new Vector(x,y);
        this.r = r;
    }
    render(pen){
        let T = this.T;
        let v = T.c2s(this.pos).add(this.offset)

        this.setProps(pen);
        pen.arc(v.x,v.y,this.r,0,Math.PI * 2);
        this.endClose(pen);
    }
}