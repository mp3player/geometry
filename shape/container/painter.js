import Vector from "../../math/vector.js";
import Queue from '../../collection/queue.js'
import EventListener from "../../event/EventListener.js";
import Transform from '../../util/transform.js'
import Shape from "../shape.js";
import { ShapeType } from "../../constant/Constant.js";
import Helper from "../../util/component/helper.js";
import { Polynomial } from "../../constant/Constant.js";
import Box from "../../box/Box.js";


export default class Painter extends EventListener {
    constructor(canvas){
        super();
        this.origin = new Vector(0,0);
        this.zoom = 10;
        this.canvas = canvas;
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.pen = this.canvas.getContext('2d');
        this.shapes = new Queue();
        this.components = new Queue();
        this.exps = new Queue();
        this.operationConfig = {
            drag    :   false,
            zoom    :   false,
        };
        this.box = new Box();
        this.init();
    }
    init(){
        this.adapt();
        let lt = this.s2c(new Vector(0,0));
        let rb = this.s2c(new Vector(this.canvas.width,this.canvas.height));
        this.box = new Box(lt.x,lt.y,rb.x,rb.y);
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
            let coord = this.s2c(new Vector(e.x,e.y));
            this.shapes.forEach(d => {
                d.isTouch(coord);
            })

            this.trigger('mousedown',coord);
        })
        document.addEventListener('mousemove',(e) => {
            if(!this.mousePress){
                return ;
            }
            document.body.style.cursor = 'pointer'
            let current = new Vector(e.x,e.y);
            let offset = current.sub(this.mouse);
            this.mouse = current;
            
            if(this.operationConfig.drag){
                this.origin.x += offset.x;
                this.origin.y -= offset.y;
                
            }
            this.trigger('mousemove',this.s2c(current))
        })
        document.addEventListener('mouseup',(e) => {
            document.body.style.cursor = 'auto'
            let current = this.s2c(new Vector(e.x,e.y));
            this.mousePress = false;
            this.trigger('mouseup',current)
        })
        document.addEventListener('mousewheel',(e) => {
            if(this.operationConfig.zoom)
                this.zoom += this.zoom *= 10 / e.wheelDelta ;
            
            // let current = this.s2c(new Vector(e.x,e.y));
            this.trigger('mousewheel',new Vector(e.wheelDeltaX,e.wheelDeltaY));
        })
        document.addEventListener('click',(e) => {
            // console.log(e)
            let mouse = new Vector(e.x,e.y);
            let p = this.s2c(mouse);
            // if(this.click )
                this.trigger('click',p)
            // console.log(p);
        })
        document.addEventListener('dblclick',() => {
            this.reset()
        })

    }
    c2s(vec){
        let sx = vec.x * this.zoom + innerWidth / 2 + this.origin.x ;
        let sy = innerHeight / 2 - vec.y * this.zoom - this.origin.y ;
        
        return new Vector(sx,sy);
    }
    s2c(vec){
        let cx = (vec.x  - innerWidth / 2 - this.origin.x) / this.zoom ;
        let cy = (innerHeight / 2 - vec.y - this.origin.y) / this.zoom ;
    
        return new Vector(cx,cy);
    }
    add(shape){

        if(shape instanceof Shape){

            this.shapes.push(shape);
        }else if(shape instanceof Helper){
            this.components.push(shape)
        }else{
            this.exps.push(shape);
        }
    }
    getWidth(){
        return this.canvas.width;
    }
    getHeight(){
        return this.canvas.height;
    }
    render(){
        let T = Transform;
        let origin = this.origin;
        let pen = this.pen;
        
        this.pen.clearRect(0,0,innerWidth,innerHeight);

        this.components.forEach(d => {
            d.render(pen,this.origin,this.zoom);
        })

        this.shapes.forEach(d => {
            switch(d.type){
                case ShapeType.LINE:{
                    if(d.points.length > 0){
                        d.setProps(pen);
                        let v = this.c2s(d.points[0].add(d.offset));
                        pen.moveTo(v.x,v.y);
                        for(let i=1;i<d.points.length;++i){
                            v = this.c2s(d.points[i].add(d.offset));
                            pen.lineTo(v.x,v.y);
                        }
                        d.endProps(pen);
                    }
                }break;

                case ShapeType.CIRCLE : {
                    let v = this.c2s(d.center.add(d.offset));

                    d.setProps(pen);
                    pen.arc(v.x,v.y,d.r * this.zoom,0,Math.PI * 2);
                    d.endClose(pen);

                }break;

                case ShapeType.POLYGON : {
                    d.setProps(pen);
                    let v = this.c2s(d.points[0]);
                    pen.moveTo(v.x,v.y);
                    for(let i=1;i<d.points.length;++i){
                        v = this.c2s(d.points[i]);
                        pen.lineTo(v.x,v.y);
                    }
                    d.endClose(pen);
                }break;

                case ShapeType.CURVE : {

                }break;

                case ShapeType.RECTANGLE : {
                    d.setProps(pen);
                    let lt = this.c2s(d.lt);
                    pen.fillRect(lt.x,lt.y,d.width * this.zoom ,d.height * this.zoom);   
                    d.endClose(pen);
                }break;
            }
        })
        
        // this.exps.forEach(d => {
        //     let l = this.s2c(new Vector(0,0));
        //     let r = this.s2c(new Vector(innerWidth,innerWidth));

        //     let p = d.getPoints(l.x,r.x);
        //     // console.log(p)
        //     let v = this.c2s(p[0]);
        //     pen.save();
        //     pen.beginPath();
        //     pen.lineWidth=2;
        //     pen.moveTo(v.x,v.y);
        //     for(let i=1;i<p.length;++i){
        //         v = this.c2s(p[i]);
        //         pen.lineTo(v.x,v.y);
        //     }
        //     pen.stroke();
        //     pen.closePath();
        //     pen.restore();
        // })

        this.exps.forEach(d => {
            let l = this.s2c(new Vector(0,0));
            let r = this.s2c(new Vector(innerWidth,innerWidth));

            let y1 = d.getValue(l.x);
            pen.beginPath();
            pen.moveTo(l.x,y1);
            for(let i=l.x;i<r.x;i += 1 / this.zoom){
                let v = d.getValue(i);
                v = this.c2s(new Vector(i,v));
                pen.lineTo(v.x,v.y);
            }
            pen.stroke();
            pen.closePath();

        })
    }
    loopRender(){
        let a = () => {
            requestAnimationFrame(a);
            this.render();
        }
        a();
    }
    reset(){
        let i = 0;
        let duration = 100;

        let zoom = (this.zoom - 10) / duration;  
        let ox = this.origin.x / duration;
        let oy = this.origin.y / duration;
        

        let timer = setInterval(() => {
            if(i >= duration){
                clearInterval(timer);
                this.zoom = 10;
                this.origin = new Vector(0,0);
            }
            this.zoom -= zoom;
            this.origin.x -= ox;
            this.origin.y -= oy;
            ++i;
            
        },1);
    }
    translate(vec){
        let v = new Vector(vec.x,-vec.y).scale(.1);
        this.origin = this.origin.add(v)
    }
    config(name,value){
        if(this.operationConfig[name] != null){
            
            this.operationConfig[name] = value ? true : false;
        }
    }
    computeBox(box){
        if(box.lt.x < this.box.lt.x){
            this.box.lt.x = box.lt.x;
        }
        if(box.lt.y > this.box.lt.y){
            this.box.lt.y = box.lt.y;
        }
        if(box.rb.x > this.box.rb.x){
            this.box.rb.x = box.rb.x;
        }
        if(box.rb.y < this.box.rb.y){
            this.box.rb.y = box.rb.y;
        }
    }
}