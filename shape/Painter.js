import Vector from "../math/Vector.js";
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

    }
    render(){
        this.updateMatrix();
        this.children.sort((a,b) => a.index - b.index );
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
    drawShapes(transform,shape){
        this.drawShape(transform,shape);
        transform = shape.getWorldMatrix(transform);
        for(let i = 0 ; i < shape.children.length ; ++ i){
            shape.children.sort( (a,b) => a.index - b.index );
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
    }
    compare(shape1,shape2){
        return shape1.index < shape2.index;
    }
}