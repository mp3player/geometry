
import {vec3,mat4,mat3} from '../math/gl-matrix/index.js'

export default class Object3D{
    constructor(){

        this.type = 'object3d'
        this.position = vec3.clone([0,0,0]);
        this.lookAt = vec3.clone([0,0,0]);
        this.up = vec3.clone([0,1,0]);

        this.modelMatrix = mat4.create();
        this.normalMatrix = mat3.create();
        this.translate = vec3.clone([0,0,0]);
        this.rotation = vec3.clone([0,0,0]);
        this.scale = vec3.clone([1,1,1]);

    }
    rotateX(x){
        this.rotation[0] += x;
    }
    rotateY(y){
        this.rotation[1] += y;
    }
    rotateZ(z){
        this.rotation[2] += z;
    }
    scaleX(x){
        this.scale[0] += x;
    }
    scaleY(y){
        this.scale[1] += y;
    }
    scaleZ(z){
        this.scale[2] += z;
    }
    translateX(x){
        this.translate[0] += x;
    }
    translateY(y){
        this.translate[1] += y;
    }
    translateZ(z){
        this.translate[2] += z;
    }
    update(){
        this.modelMatrix = mat4.create();
        mat4.translate(this.modelMatrix,this.modelMatrix,this.translate);
        mat4.rotateX(this.modelMatrix,this.modelMatrix,this.rotation[0]);
        mat4.rotateY(this.modelMatrix,this.modelMatrix,this.rotation[1]);
        mat4.rotateZ(this.modelMatrix,this.modelMatrix,this.rotation[2]);
        
        mat4.scale(this.modelMatrix,this.modelMatrix,this.scale);

        mat3.fromMat4(this.normalMatrix,this.modelMatrix);
        mat3.invert(this.normalMatrix,this.normalMatrix)
        mat3.transpose(this.normalMatrix,this.normalMatrix);

    }
}