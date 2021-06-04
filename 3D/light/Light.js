import { vec3 } from "../../math/gl-matrix/index.js";
import { OrthoCamera } from "../camera/OrthoCamera.js";
import Object3D from "../object3D.js";


class Light extends Object3D{
    constructor(color,intensity){
        super();
        this.color = color;
        this.intensity = intensity;
    }
}

class DLight extends Light{
    constructor(color,intensity,target = [0,0,0]){
        super(color,intensity);
        this.type = 'DLight';
        this.target = target;
        this.shadowCamera = new OrthoCamera();
        this.shadowWidth = 1024;
        this.shadowHeight = 1024;
    }
}
class ALight extends Light {
    constructor(color,intensity){
        super(color,intensity);
        this.type = 'ALight'
    }
}
class PLight extends Light{
    constructor(color,intensity){
        super(color,intensity);
        this.type = 'PLight';
        this.energy = 100;
    }
}
class SLight extends Light {
    constructor(color,intensity,scale = Math.PI / 4,target=[0,0,0]){
        super(color,intensity);
        this.type = 'SLight';
        this.scale = scale;
        this.target = target;
    }
}
export {DLight,ALight,PLight,SLight}