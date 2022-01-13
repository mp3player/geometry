import Painter from './shape/Painter.js'
import Circle from './shape/polygon/Circle.js'
import Polygon from './shape/polygon/Polygon.js'
import Line from './shape/path/Line.js'
import ShapeLib from './shape/ShapeLib.js'

import Shape from './shape/Shape.js'

import Vector from './math/Vector.js'
import Matrix from './math/Matrix.js'

import {StrokeStyle , FillStyle} from './util/Style.js'
import { isInPolygon } from './util/Geo.js'
import { Color } from './shape/image/image.js'

let painter = new Painter(canvas);

let strokeStyle = new FillStyle({
    background:'#f000000',
    borderColor:'#ffffff',
    borderWidth:2
});

let circle = new Circle(0,0,3,strokeStyle);
painter.add(circle);

let poly = new Polygon([
    new Vector(-200,-200),
    new Vector(-100,-300),
    new Vector(0,-310),
    new Vector(100,400),
],new FillStyle({background:'#ff00ff',borderColor:Color.TRANSPARENT}));

painter.add(poly);

circle.index = 100;

let step = 5;

document.onkeydown = function(e){
    switch(e.key){
        case 'a':{
            circle.center.x -= step;
        }break;
        case 'd':{
            circle.center.x += step;
        }break;
        case 'w':{
            circle.center.y += step;
        }break;
        case 's':{
            circle.center.y -= step;
        }break;
    }
}


document.onkeyup = function(){
    let res = isInPolygon(circle.center,poly.vertex);
    console.log(res)
}



let a = () => {

    painter.render();

    requestAnimationFrame(a);
}
a();
    