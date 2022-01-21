import Matrix from "../math/Matrix.js";
import Vector from "../math/Vector.js";
import { isInCircle, isInPolygon } from "../util/Geo.js";
import { Style } from "../util/Style.js";
import Shape from "./Shape.js";

export default class Painter extends Shape {
    
    constructor(canvas){
        super();

        this.canvas = canvas;
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.pen = this.canvas.getContext('2d');

        this.scalar = new Vector(1,-1);
        this.position = new Vector(canvas.width / 2, canvas.height / 2);
        this.caches = null;

        this.init();
    }

    init(){
        this.dispatchEvent();
    }

    dispatchEvent(){
        this.canvas.addEventListener('mousedown' , (e) =>{
            this.checkout('mousedown' ,e);
        })

        this.canvas.addEventListener('mousemove' , (e) =>{
            // this.checkout('mousemove' ,e)
        })

        this.canvas.addEventListener('mouseup' , (e) => {
            // this.checkout('mouseup' ,e)
        })

    }

    render(){
        this.caches = this.cache();
        this.drawShape(this.caches)
    }

    cache(){
        // draw the shape
        let queue = [];
        //recursive apply the drawShapes
        let drawShapes = (transform,shape) => {
            // drawShape(transform,shape);
            let worldTransform = shape.getWorldMatrix(transform);
            queue.push({ transform : worldTransform , shape : shape });
            transform = shape.getWorldMatrix(transform);
            for(let i = 0 ; i < shape.children.length ; ++ i){
                shape.children.sort( (a,b) => a.index - b.index );
                drawShapes(transform,shape.children[i]);
            }
        }
        //check out the children of the painter
        this.updateMatrix();
        this.children.sort((a,b) => a.index - b.index );
        for(let i = 0 ; i < this.children.length ; ++i){
            drawShapes(this.transform,this.children[i]);
        }
        
        queue.sort((a,b) =>{
            return a.shape.index - b.shape.index;
        })
        return queue;
    }

    drawLine(transform,line){
        let pen = this.pen;
        let vertex = line.applyTransform(transform);
        let start = vertex[0];

        pen.save();
        this.setStyle(line);
        pen.beginPath();
        pen.moveTo(start.x,start.y);
        for(let i = 0 ; i < vertex.length ; ++i){
            let v = vertex[i];
            pen.lineTo(v.x,v.y);
        }
        pen.stroke();
        pen.closePath()
        pen.restore();
    }

    drawPolygon(transform,polygon){
        let pen = this.pen;
        let vertex = polygon.applyTransform(transform);
        let start = vertex[0];

        pen.save();
        this.setStyle(polygon);
        pen.beginPath();
        pen.moveTo(start.x,start.y);
        for(let i = 0 ; i < vertex.length ; ++i){
            let v = vertex[i];
            pen.lineTo(v.x,v.y);
        }
        pen.closePath();
        pen.stroke();
        pen.fill();
        
        pen.restore();
    }

    drawCircle(transform,circle){
        let pen = this.pen;
        let [center,r] = circle.applyTransform(transform);
        pen.save();
        
        pen.beginPath();
        this.setStyle(circle);
        pen.arc(center.x,center.y,r,0,Math.PI * 2);
        pen.closePath();
        pen.stroke();
        pen.fill();
        pen.restore();
    }

    drawShape(queue){
        queue.forEach(d =>{
            let shape = d.shape;
            let transform = d.transform;
            switch(shape.Type){
                case Shape.LINE:{
                    this.drawLine(transform,shape);
                }break;
                case Shape.POLYGON:{
                    this.drawPolygon(transform,shape);
                }break;
                case Shape.CIRCLE:{
                    this.drawCircle(transform,shape);
                }break;
                case Shape.Shape:{
                    //the shape container
                }break;
            }
        })
    };    

    setStyle(shape){
        let style = shape.style;
        switch(style.Type){
            case Style.STROKE:{
                this.setStrokeStyle(style);
            }break;
            case Style.FILL:{
                this.setFillStyle(style);
            }break;
        }
    }

    setStrokeStyle(style){
        let pen = this.pen;
        pen.strokeStyle = style.borderColor;
        pen.lineWidth = style.borderWidth;
    }

    setFillStyle(style){
        let pen = this.pen;
        this.setStrokeStyle(style);
        pen.fillStyle = style.background;

    }

    compare(shape1,shape2){
        return shape1.index < shape2.index;
    }

    invertTransform(vec){
        let invert = this.transform.invert();
        return invert.applyTransform(vec);
    }

    checkout(name,e){
        let screen = new Vector(e.x,e.y);
        let coord = this.invertTransform(screen);
        let isTouch = false;
        
        for(let i = this.caches.length - 1 ; i >= 0 ; -- i){
            let d = this.caches[i];
            let shape = d.shape;
            let transform = d.transform;
            
            let ev = {screen,coord};

            switch(shape.Type){
                case Shape.CIRCLE:{
                    let [center,r] = shape.applyTransform(transform);
                    
                    let circle = {center,r};
                    isTouch = isInCircle(screen,circle);
                    console.log(isTouch)
                    //the shape will not be checkout behind the current shape
                    if(isTouch){
                        ev.target = shape;
                        shape.trigger(name,ev);
                        return;
                    }

                }break;
                case Shape.LINE:{

                }break;
                case Shape.POLYGON:{
                    let verts = shape.applyTransform(transform);
                    isTouch = isInPolygon(screen,verts);

                    //the shape will not be checkout behind the current shape
                    if(isTouch){
                        ev.target = shape;
                        shape.trigger(name,ev);
                        return;
                    }
                }break;
                default :{

                }break;
            }
            
        }
    }
}