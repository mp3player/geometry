import Painter from './shape/Painter.js'
import Circle from './shape/polygon/Circle.js'
import { Color } from './shape/image/image.js'
import Random from './math/Random.js'
import {Vertex , Graph} from './math/Graph.js'
import Vector from './math/Vector.js'
import Line from './shape/path/Line.js'
import { FillStyle, StrokeStyle } from './util/Style.js'
import {LinearScalar} from './util/Scalar.js'
import Polygon from './shape/polygon/Polygon.js'
import Shape from './shape/Shape.js'
import { readFile } from './util/io.js'
import { Animation } from './util/animation/Animation.js'


let painter = new Painter(canvas);

painter.background = new Color(0,0,0,.28);

// x=a*(2*cos(t)-cos(2*t))

// y=a*(2*sin(t)-sin(2*t))

let points = [];
let arr = []
let a = 10;
for(let t = 0 ; t < Math.PI * 2 ; t += .6){
    let x = 16 * Math.pow(Math.sin(t) , 3.0) * a;
    let y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos( 4 * t)) * a;
    points.push(new Vector(x,y));
    arr.push([x,y]);
}
console.log(JSON.stringify(arr));

let line = new Polygon(points);

painter.add(line);




let animate = () => {

    painter.render();

    requestAnimationFrame(animate);
}
animate();
    