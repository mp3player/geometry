import { vec3 } from "../../math/gl-matrix/index.js"

export default class Material {
    constructor(opt = {}){
        this.color = opt.color || vec3.clone([1,1,1]);
        this.map = opt.map || null;
        this.normalMap = opt.normalMap || null;
        this.useLight = opt.useLight != undefined ? opt.useLight : true;
        this.useShadow = opt.useShadow != undefined ? opt.useShadow : false;
        this.receiveShadow = opt.receiveShadow != undefined ? opt.receiveShadow : false;
        this.program = null;
        this.needUpdate = true;
    }
}

export class BufferMaterial {
    constructor(){
        this.map = null;
    }
}

export class BlurMaterial {
    constructor(){
        
    }
}
