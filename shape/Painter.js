import { ShapeType } from "../constant/Constant.js";
import Matrix from "../math/matrix.js";
import Vector from "../math/vector.js";
import { Style } from "../util/style.js";
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

    }
    scale(sx=0,sy=0){
        this.scalar = this.scalar.mul(new Vector(sx,sy));

    }
    add(shape){
        this.children.push(shape)
    }
    render(){
        this.updateMatrix();
        for(let i = 0 ; i < this.children.length ; ++i){
            this.drawShapes(this.transform,this.children[i]);
        }
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
        pen.stroke();
        pen.fill();
        pen.closePath();
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
    drawShapes(transform,shape){
        this.drawShape(transform,shape);
        transform = shape.getWorldMatrix(transform);
        for(let i = 0 ; i < shape.children.length ; ++ i){
            this.drawShapes(transform,shape.children[i]);
        }
    }
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
    drawShape(transform,shape){
        transform = shape.getWorldMatrix(transform);
        switch(shape.Type){
            case ShapeType.LINE:{
                this.drawLine(transform,shape);
            }break;
            case ShapeType.POLYGON:{
                this.drawPolygon(transform,shape);
            }break;
            case ShapeType.CIRCLE:{
                this.drawCircle(transform,shape);
            }break;
            case ShapeType.Shape:{
                //the shape container
            }break;
        }
    }
    mask(color = 'rgba(255,255,255,255)'){
        let pen = this.pen;
        pen.save();
        pen.beginPath();
        pen.fillStyle = color;
        pen.fillRect(0,0,this.canvas.width,this.canvas.height);
        pen.fill();
        pen.closePath();
        pen.restore();
    }
}