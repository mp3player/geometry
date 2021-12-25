import Vector from "../../math/vector.js";
import { ShapeType } from "../../constant/Constant.js";
import Shape from "../Shape.js";
export default class Circle extends Shape{
    constructor(x=0,y=0,r=1,style){
        super(style);
        this.Name = 'circle';
        this.Type = ShapeType.CIRCLE;
        this.center = new Vector(x,y);
        this.radius = r;
    }
    applyTransform(transform){
        let center = transform.applyTransform(this.center);
        let r = this.radius;
        r = transform.getRotation().applyTransform(new Vector(r,0)).length();

        return [center,r];
    }
}