import { mat4 } from "../../math/gl-matrix/index.js";
import Object3D from "../object3D.js";

class OrthoCamera extends Object3D{
    constructor(left=-100,right=100,bottom=-100,top=100,near=1,far=100){
        super();
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
        this.near = near; 
        this.far = far;
        
        this.projectionMatrix = mat4.create();
        this.viewMatrix = mat4.create();
    }
    update(){
        mat4.ortho(this.projectionMatrix,-this.width/2,this.width,-this.yWidth/2,this.yWidth,0,zWidth);
        mat4.lookAt(this.viewMatrix,this.position,this.lookAt,this.up);
    }
}

export {OrthoCamera}