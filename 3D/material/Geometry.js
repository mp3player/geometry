import Object3D from "../object3D.js";

export default class Geometry{
    constructor(position,uv,normal,color=[]){
        this.position = position;
        this.uv = uv;
        this.normal = normal;
        this.color = color;
    }
}
