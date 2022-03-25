import Matrix from "../math/Matrix.js";
import Vector from "../math/Vector.js";
import { Event, EventManager, MouseEvent } from "../util/EventListener.js";
import { isInCircle, isInPolygon } from "../util/Geo.js";
import { Style } from "../util/Style.js";
import { Color } from "./image/image.js";
import line from "./path/Line.js";
import Shape from "./Shape.js";

export default class Painter extends Shape {
    constructor(canvas){
        super();

        this.canvas = canvas;
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.pen = this.canvas.getContext('2d');

        this.scalar = new Vector(1,-1);
        this.translation = new Vector(canvas.width / 2, canvas.height / 2);
        this.caches = null;
        this.background = Color.WHITE;
        
        //事件
        this.eventMgr = null;

        this.init();
    }

    init(){
        this.registEvent();
    }

    registEvent(){
        // 建立事件队列
        // 采用事件捕获的方式向下传递事件，这是因为最顶层的canvas才有绑定事件的能力
        /**
         * 1、采用事件捕获的方式去实现，并在每一个shape中使用坐标去计算在自己坐标系下的位置，并计算是否应该触发事件
         * 
         * # 2、创建事件的时候需要已经确定那个对象是已经被选定为触发对象，并将其作为target传入到事件对象中
         * 
         * # 3、drag 事件会屏蔽掉其余的事件
         */
        // 响应事件队列

        this.canvas.addEventListener('mousedown' , (e) =>{
            this.eventMgr = new EventManager(e);
        })

        this.canvas.addEventListener('mousemove' , (e) =>{
            this.eventMgr = new EventManager(e);
        })

        // this.canvas.addEventListener('mouseover',e => {
        //     this.eventMgr = new EventManager(e);
        // })

        // this.canvas.addEventListener('mouseenter',(e) => {
        //     this.eventMgr = new EventManager(e);
        // })

        // this.canvas.addEventListener('mouseleave',(e) => {
        //     this.eventMgr = new EventManager(e);
        // })

        this.canvas.addEventListener('mouseup' , (e) => {
            this.eventMgr = new EventManager(e);

        });

        this.canvas.addEventListener('contextmenu' , e => {
            // e.preventDefault()
        })
    }

    // 事件触发
    dispatchEvent(){
        let originEvent = this.eventMgr.getEvent();
        let shapes = this.caches;
        let screen = this.eventMgr.getScreen();
        
        let queue = [];
        for(let i = 0 ; i < shapes.length ; ++ i){
            let shape = shapes[i]['shape'];
            let trans = shapes[i]['transform'];
            
            if(shape.hasChild()) continue;
            
            let event = new MouseEvent(originEvent);

            switch(shape.Type){
                case Shape.CIRCLE:{
                    let [center,r] = shape.applyTransform(trans);
                    let circle = {center,r};
                    let isTouch = isInCircle(screen,circle);
                    // 事件冒泡
                    if(isTouch)
                        queue.push( { shape , event } )

                }break;
                case Shape.LINE:{

                }break;
                case Shape.POLYGON:{
                    let verts = shape.applyTransform(trans);
                    let isTouch = isInPolygon(screen,verts);
                    if(isTouch)
                        queue.push( { shape , event } )

                }break;
                default :{

                }break;
            }
        }
        for(let i = 0 ; i < queue.length ; ++ i){
            let shape = queue[i]['shape'];
            let event = queue[i]['event'];
            event.target = shape;
            switch(event.Type){
                case Event.MOUSE_PRESS_EVENT:{
                    while(shape != null){
                        event.path.push(shape);
                        shape.trigger('press',event);
                        shape = shape.parent;
                    }
                    
                }break;
                case Event.MOUSE_MOVE_EVENT:{
                    while(shape != null){
                        event.path.push(shape);
                        shape.trigger('move',event);
                        shape = shape.parent;
                    }
                }break;
                case Event.MOUSE_REALEASE_EVENT:{
                    while(shape != null){
                        event.path.push(shape);
                        shape.trigger('release',event);
                        shape = shape.parent;
                    }
                }break;
                case Event.MOUSE_OVER_EVENT:{
                    while(shape != null){
                        event.path.push(shape);
                        shape.trigger('over',event);
                        shape = shape.parent;
                    }
                }break;
                case Event.MOUSE_ENTER_EVENT:{
                    while(shape != null){
                        event.path.push(shape);
                        shape.trigger('enter',event);
                        shape = shape.parent;
                    }
                }break;
                case Event.MOUSE_OUT_EVENT:{
                    while(shape != null){
                        event.path.push(shape);
                        shape.trigger('out',event);
                        shape = shape.parent;
                    }
                }break;
            }
        }
        this.eventMgr = null;
    }

    render(){
        this.caches = this.cache();
        this.pen.save();
        this.pen.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.pen.fillStyle = this.background;
        this.pen.fillRect(0,0,this.canvas.width , this.canvas.height)
        this.pen.restore();
        this.drawShape(this.caches);
        // console.log(this.eventMgr)
        if(this.eventMgr)
            this.dispatchEvent();
    }

    cache(){

        // 对shape做预处理，建立transform 和 shape的一个绘制队列
        // draw the shape
        let queue = [];
        // recursive apply the drawShapes
        // the drawShapes function don't apply drawing operation
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
        let v0 = vertex[0];
        let v1 = vertex[1];

        pen.save();
        this.setStyle(line);
        pen.beginPath();
        pen.moveTo(v0.x,v0.y);
        pen.lineTo(v1.x,v1.y);
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

    capture(name,e){
        //用点击区域对shape做碰撞测试
        let screen = new Vector(e.x,e.y);
        let coord = this.invertTransform(screen);
        let isTouch = false;
        
        for(let i = this.caches.length - 1 ; i >= 0 ; -- i){
            let d = this.caches[i];
            let shape = d.shape;
            let transform = d.transform;
            
            let ev = {screen,coord};

            if(shape.draggable == true){

                break;
            }

            
        }
    }
}