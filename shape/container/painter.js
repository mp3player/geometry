import Vector from "../../math/vector.js";
import Queue from '../../collection/queue.js'
import EventListener from "../../event/EventListener.js";
import Transform from '../../util/transform.js'
import Shape from "../shape.js";
import { ShapeType } from "../../constant/ConstantShape.js";

export default class Painter extends EventListener {
    constructor(canvas){
        super();
        this.center = new Vector(0,0);
        this.zoom = 1;
        this.canvas = canvas;
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.pen = this.canvas.getContext('2d');
        this.shapes = new Queue();
        this.components = new Queue();

        this.init();
    }
    init(){
        this.adapt();
    }
    adapt(){
        window.addEventListener('resize',() => {
            this.canvas.width = innerWidth;
            this.canvas.height = innerHeight;
        })
        document.addEventListener('mousedown',(e) => {
            this.mousePress = true;
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        })
        document.addEventListener('mousemove',(e) => {
            if(!this.mousePress){
                return ;
            }
            let current = new Vector(e.x,e.y);
            let offset = current.sub(this.mouse);
            this.mouse = current;
            this.center.x += offset.x;
            this.center.y -= offset.y;
        })
        document.addEventListener('mouseup',(e) => {
            this.mousePress = false;
        })
        document.addEventListener('mousewheel',(e) => {
            // console.log(e.wheelDelta);

            this.zoom += e.wheelDelta / 12000;
            console.log(this.zoom)
        })

    }
    add(shape){
        if(shape instanceof Shape)
            this.shapes.push(shape);
        else
            this.components.push(shape)
    }
    getWidth(){
        return this.canvas.width;
    }
    getHeight(){
        return this.canvas.height;
    }
    render(){
        let T = Transform;
        let origin = this.center;
        let pen = this.pen;
        
        this.pen.clearRect(0,0,innerWidth,innerHeight);

        this.shapes.forEach(d => {
            switch(d.type){
                case ShapeType.LINE:{
                    d.setProps(pen);
                    let v = T.c2s(d.points[0].add(origin).add(d.offset));
                    pen.moveTo(v.x,v.y);
                    for(let i=1;i<d.points.length;++i){
                        v = T.c2s(d.points[i].add(origin).add(d.offset));
                        pen.lineTo(v.x,v.y);
                    }
                    d.endProps(pen);
                }break;

                case ShapeType.CIRCLE : {
                    let v = T.c2s(d.pos.add(origin).add(d.offset));

                    d.setProps(pen);
                    pen.arc(v.x,v.y,d.r,0,Math.PI * 2);
                    d.endClose(pen);

                }break;

                case ShapeType.POLYGON : {
                    d.setProps(pen);
                    let v = T.c2s(d.points[0].add(origin).add(d.offset));
                    pen.moveTo(v.x,v.y);
                    for(let i=1;i<d.points.length;++i){
                        v = T.c2s(d.points[i].add(origin).add(d.offset));
                        pen.lineTo(v.x,v.y);
                    }
                    d.endClose(pen);
                }
            }
        })
        this.components.forEach(d => {
            d.render(pen,this.center);
        })
    }
    loopRender(){
        let a = () => {
            requestAnimationFrame(a);
            
            this.render();
        }
        a();
    }
}