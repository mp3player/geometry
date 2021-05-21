import Box from "../../box/Box.js";
import { ShapeType } from "../../constant/Constant.js";
import Vector from "../../math/vector.js";
import Shape from "../shape.js";

export default class Rectangle extends Shape {
    constructor(x,y,width,height,props){
        super(props);
        this.lt = new Vector(x,y);
        this.width = width;
        this.height = height;
        this.type = ShapeType.POLYGON;
        this.points = []
        this.init();

    }
    init(){
        let lt = this.lt.copy();
        let lb = new Vector(lt.x,lt.y + this.height);
        let rb = new Vector(lt.x + this.width,lt.y + this.height);
        let rt = new Vector(lt.x + this.width,lt.y);
        this.points = this.points.concat(lt,lb,rb,rt)
        this.computeBox();
    }
    //no scale and translate
    computeBox(){
        let lt = this.lt.copy();
        let rt = lt.add(new Vector(this.width,0));
        let rb = rt.add(new Vector(0,-this.height));
        let lb = lt.add(new Vector(0,-this.height));

        this.updateBox(lt);
        this.updateBox(rt);
        this.updateBox(rb);
        this.updateBox(lb);
    }
}