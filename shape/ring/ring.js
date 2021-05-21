import { ShapeType } from "../../constant/Constant.js";
import Vector from "../../math/vector.js";
import Shape from "../shape.js";
export default class Ring extends Shape {
    constructor(points,offset = 1,props){
        super(props);
        this.type = ShapeType.RING;
        this.offset = offset ;
        this.points = [];
        this.inner = [];
        this.outer = [];
        this.computeBox();
        this.init(points);

    }
    init(points){
        for(let i =0;i<points.length;++i){
            this.inner.push(points[i].copy());
        }
        this.update();
    }
    update(){
        let outer = [];
        let p = this.inner ;
        //compute the inner points and the outer points;
        for(let i = 0 ; i < p.length ; ++i){
            let p0 = p[i];
            let p1 = p[(i + 1) % p.length];
            let p2 = p[(i + 2) % p.length];

            let v0 = p0.sub(p1).normalize();
            let v1 = p2.sub(p1).normalize();

            let rad = Math.acos(v0.dot(v1));

            let sin = Math.sin(rad);
            let len = this.offset / sin;

            // console.log(v0.length(),v1.length())

            let split = v0.add(v1).scale(len);

            v0 = p1.sub(p0);
            v1 = p2.sub(p1);
            let z = v0.x * v1.y - v0.y * v1.x;
            
            if(z > 0){
                split = new Vector(-split.x,-split.y);
                outer.push( split.add(p1) );
            }else{
                outer.push( split.add(p1) );
            }
        }

        let v = outer.pop();
        outer.unshift(v);
        outer.push(outer[0]);
        outer.reverse();
        this.points = this.inner.concat([p[0]]).concat(outer);
        this.outer = outer;
    }
    
    computeBox(){
        for(let i=0;i<this.points.length;++i){
            this.updateBox(this.points[i]);
        }
    }
}