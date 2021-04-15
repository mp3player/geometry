import Shape from "../shape.js";
import Vector from "../../math/vector.js";

export default class Circle extends Shape {
    constructor(x,y,r,props){
        super(props);
        this.type = 'circle';
        this.pos = new Vector(x,y);
        this.r = r;
    }
}