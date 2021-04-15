import { Color } from "../../constant/ConstantColor.js";
import Vector from "../../math/vector.js";
import line from "../../shape/path/line.js";

export default class Grid {
    constructor(sx,sy){
        this.sx = sx;
        this.sy = sy;
        this.xLine = [];
        this.yLine = [];
        for(let i=1;i<innerHeight/2;i+=this.sx){
            
                this.xLine.push(
                    new line([
                        new Vector(-innerWidth / 2,i),
                        new Vector(innerWidth / 2,i)
                    ],{
                        borderColor:Color.RED
                    })
                    ,
                    new line([
                        new Vector(-innerWidth / 2,-i),
                        new Vector(innerWidth / 2,-i)
                    ],{
                        borderColor:Color.RED
                    })
                );
        }
        for(let j=0;j<innerWidth/2;j+=this.sy){
            this.yLine.push(
                new line([
                    new Vector(j,-innerHeight/2),
                    new Vector(j,innerHeight/2),
                ],{
                    borderColor:Color.GREEN
                })
                ,
                new line([
                    new Vector(-j,-innerHeight/2),
                    new Vector(-j,innerHeight/2),
                ],{
                    borderColor:Color.GREEN
                })
            )
        }
    }
    render(pen){
        this.xLine.forEach(d => {
            d.render(pen);
        })
        this.yLine.forEach(d => {
            d.render(pen);
        })
    }
}