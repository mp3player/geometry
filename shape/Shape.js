import Vector from "../math/Vector.js";
import Matrix from '../math/Matrix.js'
import { StrokeStyle } from "../util/Style.js";
import { EventListener } from "../util/EventListener.js";
import Painter from "./Painter.js";
import { DataType } from "../util/Type.js";

/**
 * type     :       shape type
 * position :       Shape position attribute
 * scalar   :       Shape scalar attribute
 * rotation :       Shape rotation attribute
 * props    :       render properties
 * index    :       the index of the shape
 * box      :       the rect border of the shape
 * children :       the child shape of this shape
 */

export default class Shape extends EventListener{
    constructor(style = new StrokeStyle()){
        super();
        this.style = style;
        this.Name = 'shape';
        this.Type = Shape.SHAPE;
        this.translation = new Vector(0,0);
        this.scalar = new Vector(1,1);
        this.rotation = 0;
        this.index = 0;
        this.transform = new Matrix();
        this.children = [];
        this.parent = null;
    }   

    hasChild(){
        return this.children.length > 0;
    }

    hasParent(){
        return this.pareent == null;
    }

    add(shape){
        shape.parent = this;
        this.children.push(shape);
    }
    //remove the shape coresponding the id
    remove(id){

    }

    translate(x=0,y=0){
        this.translation = this.translation.add(new Vector(x,y));
    }

    setTranslation(vec){
        this.translation = vec;
    }

    rotate(r=0){
        this.rotation += r;
    }

    setRotation(r){
        this.rotation = r;
    }

    scale(sx=0,sy=0){
        this.scalar = this.scalar.mul(new Vector(sx,sy));
    }

    setScalar(vec){
        this.scalar = vec;
    }

    updateMatrix(){
        //计算图形矩阵矩阵
        let mat = new Matrix();

        mat = mat.applyScalar(this.scalar);
        mat = mat.applyRotation(this.rotation);
        mat = mat.applyTranslation(this.translation);
        // console.log(this.scalar)

        this.transform = mat;
    }

    getWorldMatrix(transform){
        //计算世界坐标系下的图形矩阵
        this.updateMatrix();
        return transform.multiply(this.transform);
    }
    
    applyTransform(transform){
        
    }


    static      SHAPE               =   'shape';
    static      PATH                =   'path';
    static      LINE                =   'line';
    static      POLYGON             =   'polygon';
    static      CIRCLE              =   'circle';
    static      CURVE               =   'curve';
    static      RING                =   'ring';
    static      RECTANGLE           =   'rectangle';
    static      HELPER              =   'helper';
    static      CONNECTION_HELPR    =   'connection_helper';
}