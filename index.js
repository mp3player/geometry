import Painter from './shape/Painter.js'
import Circle from './shape/polygon/Circle.js'
import { Color } from './shape/image/image.js'
import Random from './math/Random.js'
import {Vertex , Graph} from './math/Graph.js'
import Vector from './math/Vector.js'
import Line from './shape/path/Line.js'
import { FillStyle, StrokeStyle } from './util/Style.js'

let painter = new Painter(canvas);

painter.background = new Color(0,0,0,.8);

//旅行商问题
//version 1 brute force algorithm
//用图来保存内容
const totalCount = 10;
let graph = new Graph(totalCount,Graph.UDAG);

let fillStyle = new FillStyle({
    background:Color.PURPLE,
    borderColor : Color.TRANSPARENT
})
let strokeStyle = new StrokeStyle({
    borderWidth : 2,
    borderColor : Color.RED
});


//随机生成城市，记录他们之间的距离
let vecs = [];

for(let i = 0 ; i < totalCount ; ++ i){
    let x = Random.rFloat(-innerWidth / 2 + 10,innerWidth / 2 - 10);
    let y = Random.rFloat(-innerHeight / 2 + 10,innerHeight / 2 - 10);
    let center = new Vector(x,y);
    let circle = new Circle(x,y,10,fillStyle);
    circle.index = 10;
    vecs.push(center);
    painter.add(circle);
    //生成点，放入图中
    let vert = new Vertex("vert-"+i , center);
    graph.add(vert);
}

//为两两顶点生成路径
for(let i = 0 ; i < totalCount ; ++ i){
    for(let j = i + 1 ; j < totalCount ; ++ j){
        graph.connect(i , j , Random.rInt(0,100));
        let vert_i = graph.getVert(i);
        let vert_j = graph.getVert(j);
        let line = new Line(vert_i.info.copy(),vert_j.info.copy(),strokeStyle);
        painter.add(line);
    }
    
}

let a = () => {

    painter.render();

    requestAnimationFrame(a);
}
a();
    