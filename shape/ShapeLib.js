import Complex from "../math/complex.js";
import Vector from "../math/vector.js";

export default class ShapeLib {
    static fivePointStar(radius=1){
        return ShapeLib.pointStar(5,radius)
    }
    static sixPointStar(radius=1){
        return ShapeLib.pointStar(6,radius)
    }

    static pointStar(count=3,radius=1){
        count = Number.parseInt(count);
        if(count < 3)
            return ;
        count *= 2;
        let base = new Complex(0,radius);
        let angle = Math.PI * 2 / count;
        let rotate = new Complex(Math.cos(angle),Math.sin(angle));
        let scale = 1;
        let points = [];
        for(let i=0;i<count;++i){
            if(i % 2 == 0)
                scale = 1;
            else 
                scale = .5;
            points.push(base.toVector().scale(scale));
            base = base.mul(rotate);
        }
        return points;
    }

    static arrow(size = 1){
        return [
            new Vector(0,2 * size),
            new Vector(-size,0),
            new Vector(0,.5 * size),
            new Vector(size,0),
        ]
    }
}