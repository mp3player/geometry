import {vec3,mat4} from '../../math/gl-matrix/index.js'
import Object3D from '../object3D.js'

export default class Camera extends Object3D {
    constructor(){
        super();
        this.renderTarget = null;
        this.renderToScreen = true;
        this.projectionMatrix = mat4.create();
        this.viewMatrix = mat4.create();
        
    }
    control(ele){
        ele.onmousedown = (e) => {
            if(e.button != 0)
                return ;
            let x = e.x,y = e.y;
            let len = vec3.dist(this.position,this.lookAt)

            ele.onmousemove = (ev) => {
                let ox = ev.x - x,oy = ev.y - y;
                x = ev.x , y = ev.y ;

                vec3.rotateY(this.position,this.position,[0,0,0],-ox * Math.PI / 180)

                this.position[1] += oy / 10;
                let len1 = vec3.dist(this.position,this.lookAt);
                this.position[0] *= len / len1;
                this.position[1] *= len / len1;
                this.position[2] *= len / len1;

            }
            ele.onmouseup = function(e){
                this.onmousemove = null;
                this.onmouseup = null;
            }
        }
        ele.onmousewheel = (e) => {
            let len = vec3.dist(this.position,this.lookAt)

            let dis = e.deltaY;
            if(dis > 0){
                this.position[0] += this.position[0] / 10;
                this.position[1] += this.position[1] / 10;
                this.position[2] += this.position[2] / 10;
                
            }else{
                this.position[0] -= this.position[0] / 10;
                this.position[1] -= this.position[1] / 10;
                this.position[2] -= this.position[2] / 10;
            }

        }
    }
}
