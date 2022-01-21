import Painter from './shape/Painter.js'
import Circle from './shape/polygon/Circle.js'
import Polygon from './shape/polygon/Polygon.js'
import ShapeLib from './shape/ShapeLib.js'

import Shape from './shape/Shape.js'

import {StrokeStyle , FillStyle} from './util/Style.js'
import { Color } from './shape/image/image.js'

let painter = new Painter(canvas);

let strokeStyle = new FillStyle({
    background:'#f000000',
    borderColor:'#ffffff',
    borderWidth:2
});

let circle = new Circle(0,0,40,strokeStyle);
painter.add(circle);

let shape = new Shape();

let poly = new Polygon(ShapeLib.Rect(100,100),new FillStyle({background:'#ff00ff',borderColor:Color.TRANSPARENT}));

shape.add(poly);

poly.post = true;

shape.on('mousedown',(e) =>{
    console.log(e)
})

poly.on('mousedown',(e) => {
    console.log(e)
}) 

painter.add(shape);

let a = () => {

    painter.render();

    requestAnimationFrame(a);
}
a();
    