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

        this.uniforms = {
            color : { value : this.color , type : 'vec3' },
            map : { value : this.map , type : 'texture' },
            normalMap : { value : this.normalMap , type : 'texture' },
        }
        this.defines = {
            useMap : { value : this.map ? true : false },
            useNormalMap : { value : this.normalMap ? true : false },
            useLight : { value : this.useLight },
            useShadow : { value : this.useShadow },
            useShadowMap : { value : this.receiveShadow }
        }
    }
}
