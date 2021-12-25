import Vector from "../math/vector.js";
import { ShapeType } from "../constant/Constant.js";
import Matrix from '../math/matrix.js'
import { StrokeStyle } from "../util/style.js";

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

export default class Shape{
    constructor(style = new StrokeStyle()){
        this.style = style;
        this.Name = 'shape';
        this.Type = ShapeType.SHAPE;
        this.position = new Vector(0,0);
        this.scalar = new Vector(1,1);
        this.rotation = 0;
        this.index = 0;
        this.transform = new Matrix();
        this.children = [];
    }
    add(shape){
        this.children.push(shape);
    }
    translate(x=0,y=0){
        this.position = this.position.add(new Vector(x,y));
    }
    setPosition(vec){
        this.position = vec;
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
        mat = mat.applyTranslation(this.position);
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
}