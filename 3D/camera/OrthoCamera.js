import { mat4 } from "../../math/gl-matrix/index.js";
import Camera from "./Camera.js";

export default class OrthoCamera extends Camera{
    constructor(left=-10,right=10,bottom=-10,top=10,near=1,far=100){
        super();
        this.type = 'orthoCamera';
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
        this.projectionMatrix = mat4.create();
        this.viewMatrix = mat4.create();
        mat4.ortho(this.projectionMatrix,this.left,this.right,this.bottom,this.top,this.near,this.far);
        mat4.lookAt(this.viewMatrix,this.position,this.lookAt,this.up);
    }
}

export {OrthoCamera}