import Object3D from "./object3D.js";

export default class Mesh extends Object3D{
    constructor(position,uv,normal){
        super();
        this.position = position;
        this.uv = uv;
        this.normal = normal;
    }
}