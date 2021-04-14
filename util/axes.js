import Vector from "../math/vector";
import line from "../shape/line";
import Shape from "../shape/shape";

export default class Axes extends Shape {
    constructor(cx,cy){
        this.cs = cs;
        this.cy = cy;
    }
    render(pen){
        let x = new line([
            new Vector(-innerWidth/2,0),
            new Vector(innerWidth/2,0)
        ]);
        let y = new line([
            new Vector(0,innerHeight / 2),
            new Vector(0,innerHeight / 2)
        ]);

        
    }
}