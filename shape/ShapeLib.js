import Complex from "../math/Complex.js";
import Vector from "../math/Vector.js";

export default class ShapeLib {
    static FivePointStar(radius=1){
        return ShapeLib.pointStar(5,radius)
    }
    static SixPointStar(radius=1){
        return ShapeLib.pointStar(6,radius)
    }

    static PointStar(count=3,radius=1){
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

    static Arrow(size = 1){
        return [
            new Vector(0,2 * size),
            new Vector(-size,0),
            new Vector(0,.5 * size),
            new Vector(size,0),
        ]
    }

    static BezierCurve(args){
        //find the interval point between v1 and v2 according to the given factor
        let getInterval = (v0,v1,fac) => {
            let v = v1.sub(v0);
            
            return v.scale(fac).add(v0);
        }
        //递归获取每一次的顶点数目
        let getKeyVertex = (vert,fac) => {
            let len = vert.length;
            if(len <= 1)
                return vert[0];
            let vs = []
            for(let i = 0 ; i < len - 1 ; ++ i){
                let v0 = vert[i];
                let v1 = vert[i + 1];
                let v = getInterval(v0,v1,fac);
                vs.push(v);
            }

            return getKeyVertex(vs,fac);
        }
        //
        let getVertex = () => {
            let length = args.length;
            let vert = []
            for(let i = 0 ; i < 1 ; i += .05){
                let v = getKeyVertex(args,i);
                vert.push(v);
            }
            return vert;
        }

        return getVertex();
    }
}