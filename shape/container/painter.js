import Vector from "../../math/vector.js";
import Queue from '../../collection/queue.js'
import EventListener from "../../event/EventListener.js";
import Transform from '../../util/transform.js'
import Shape from "../shape.js";
import { ShapeType } from "../../constant/Constant.js";
import Helper from "../../util/component/helper.js";
import { Polynomial } from "../../constant/Constant.js";
import Box from "../../box/Box.js";
import PolyFunction from "../polynomial/function.js";


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
        this.images = new Queue();

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

            this.updatePosition(e);
            
            this.shapes.forEach(d => {
                d.isTouch(this.coordinate);
            })

            this.trigger('mousedown',this.coordinate);
        })
        document.addEventListener('mousemove',(e) => {
            document.body.style.cursor = 'pointer';

            let current = new Vector(e.x,e.y);
            let offset = current.sub(this.screen);
            
            this.updatePosition(e);

            
            if(this.operationConfig.drag && this.mousePress){
                this.origin.x += offset.x;
                this.origin.y -= offset.y;
            }
            this.trigger('mousemove',this.s2c(current));
            this.repaint();
        })
        document.addEventListener('mouseup',(e) => {
            document.body.style.cursor = 'auto'
            this.updatePosition(e);
            this.mousePress = false;
            this.trigger('mouseup',this.coordinate)
        })
        document.addEventListener('mousewheel',(e) => {
            this.updatePosition(e);
            if(this.operationConfig.zoom)
                this.zoom += this.zoom *= 10 / e.wheelDelta ;
            
            // let current = this.s2c(new Vector(e.x,e.y));
            this.trigger('mousewheel',new Vector(e.wheelDeltaX,e.wheelDeltaY));
            
        })
        document.addEventListener('click',(e) => {
            // console.log(e)
            // let mouse = new Vector(e.x,e.y);
            // let p = this.s2c(mouse);
            // if(this.click )
                // this.trigger('click',p)
            // console.log(p);
        })
        document.addEventListener('dblclick',() => {
            // this.reset()
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
            this.updateBox(shape.box);
        }else if(shape instanceof Helper){
            this.components.push(shape)
        }else if(shape instanceof PolyFunction){
            this.exps.push(shape);
        }else{
            this.images.push(shape);
        }
        this.repaint();
    }
    getWidth(){
        return this.canvas.width;
    }
    getHeight(){
        return this.canvas.height;
    }
    render(){
        let pen = this.pen;
        
        this.pen.clearRect(0,0,innerWidth,innerHeight);

        this.components.forEach(d => {
            d.render(pen,this.origin,this.zoom,this.screen,this.coordinate);
        })

        //apply translate rotate and scale 
        //the first transform is rotate ,and then scale ,translate at last
        this.shapes.forEach(d => {
            if(d == null)
                d.type == 'null'
            switch(d.type){
                case ShapeType.LINE:{
                    if(d.points.length > 0){
                        d.setProps(pen);
                        let p0 = d.points[0];
                        p0 = p0.rotate(d.rotation);
                        let v = this.c2s(p0.add(d.offset).add(d.offset));
                        pen.moveTo(v.x,v.y);
                        for(let i=1;i<d.points.length;++i){
                            let pi = d.points[i];
                            pi = pi.rotate(d.rotation)
                            v = this.c2s(pi);
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
                    if(d.points.length > 0){
                        d.setProps(pen);
                        let p0 = d.points[0];
                        p0 = p0.rotate(d.rotation);
                        let v = this.c2s(p0.add(d.offset));
                        pen.moveTo(v.x,v.y);
                        for(let i=1;i<d.points.length;++i){
                            let pi = d.points[i];
                            pi = pi.rotate(d.rotation);
                            v = this.c2s(pi.add(d.offset));
                            pen.lineTo(v.x,v.y);
                        }
                        d.endClose(pen);
                    }
                
                }break;

                case ShapeType.CURVE : {

                }break;

                case ShapeType.RING : {
                    
                    d.update();
                    d.setProps(pen);
                    let v = this.c2s(d.points[0].add(d.offset));
                    pen.moveTo(v.x,v.y);
                    for(let i=1;i<d.points.length;++i){
                        v = this.c2s(d.points[i].add(d.offset));
                        pen.lineTo(v.x,v.y);
                    }
                    d.endClose(pen);

                }
            }
        })
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
        this.images.forEach(d => {

            let offset = this.c2s(d.offset).sub(d.center);
            this.pen.putImageData(d,offset.x,offset.y);

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
        let v = new Vector(vec.x,-vec.y).scale(.5);
        this.origin = this.origin.add(v);
        this.repaint();
    }
    scale(s){
        this.zoom += s;
        this.repaint();
    }
    config(name,value){
        if(this.operationConfig[name] != null){
            this.operationConfig[name] = value ? true : false;
        }
    }
    updateBox(box){
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
    updatePosition(e){
        this.screen = new Vector(e.x,e.y);
        this.coordinate = this.s2c(new Vector(e.x,e.y));
    }
    repaint(){
        return ;
        this.render();
    }
}