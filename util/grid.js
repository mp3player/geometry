import { Color } from "../constant/ConstantColor.js";
import Vector from "../math/vector.js";
import line from "../shape/line.js";

export default class Grid {
    constructor(sx,sy){
        this.sx = sx;
        this.sy = sy;
    }
    render(pen){
        let sx = this.sx;
        let sy = this.sy;
        for(let i=0;i<innerHeight;i+=sx){
            
                new line([
                    new Vector(-innerWidth / 2,i),
                    new Vector(innerWidth / 2,i)
                ],{
                    borderColor:Color.RED
                }).render(pen);

                new line([
                    new Vector(-innerWidth / 2,-i),
                    new Vector(innerWidth / 2,-i)
                ],{
                    borderColor:Color.RED
                }).render(pen);
        }
        for(let j=0;j<innerWidth;j+=sy){
            new line([
                new Vector(j,-innerHeight/2),
                new Vector(j,innerHeight/2),
            ],{
                borderColor:Color.GREEN
            }).render(pen);

            new line([
                new Vector(-j,-innerHeight/2),
                new Vector(-j,innerHeight/2),
            ],{
                borderColor:Color.GREEN
            }).render(pen);
        }
    }
}