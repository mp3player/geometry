import Vector from "../../math/vector.js";
import Queue from '../../collection/queue.js'

export default class Painter {
    constructor(canvas){
        this.canvas = canvas;
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.pen = this.canvas.getContext('2d');
        this.shapes = new Queue();
    }
    add(shape){
        this.shapes.push(shape);
    }
    getWidth(){
        return this.canvas.width;
    }
    getHeight(){
        return this.canvas.height;
    }
    coord2Screen(x,y){
        let width = this.getWidth();
        let height = this.getHeight();

        let sx = x + width / 2;
        let sy = height / 2 - y;
        
        return new Vector(sx,sy);
    }
    screen2Coord(x,y){
        let width = this.getWidth();
        let height = this.getHeight();

        let cx = x - width / 2;
        let cy = height / 2 - y;

        return new Vector(cx,cy);
    }
    render(){
        this.shapes.forEach(d => {
            d.render(this.pen);
        })
    }
    loopRender(){
        let a = () => {
            requestAnimationFrame(a);
            this.pen.clearRect(0,0,innerWidth,innerHeight);
            this.render();
        }
        a();
    }
}