import { vec3 } from "../../math/gl-matrix/index.js";
import { OrthoCamera } from "../camera/OrthoCamera.js";
import Object3D from "../object3D.js";


class Light extends Object3D{
    constructor(color,intensity){
        this.color = vec3.clone([1,1,1]);
        this.intensity = 1.0;
    }
}

class DLight extends Light{
    constructor(color,intensity){
        super(color,intensity);
        this.shadowCamera = new OrthoCamera();
    }
}