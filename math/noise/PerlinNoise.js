import Vector from "../vector.js";

export default class PerlinNoise {
    static noise(x,y = 0){
        let octave = PerlinNoise.octave ? PerlinNoise.octave : 8;
        
        let x0 = Number.parseInt(x / octave);
        let x1 = x0 + 1;
        let y0 = Number.parseInt(y / octave);
        let y1 = y0 + 1;

        //the random vector
        let x0y0 = PerlinNoise.randomGradient(x0,y0);
        let x1y0 = PerlinNoise.randomGradient(x1,y0);
        let x0y1 = PerlinNoise.randomGradient(x0,y1);
        let x1y1 = PerlinNoise.randomGradient(x1,y1);

        //gradient
        let g0 = new Vector(x - x0 * octave,y - y0 * octave).scale(1/octave);
        let g1 = new Vector(x - x1 * octave,y - y0 * octave).scale(1/octave);
        let g2 = new Vector(x - x0 * octave,y - y1 * octave).scale(1/octave);
        let g3 = new Vector(x - x1 * octave,y - y1 * octave).scale(1/octave);

        let d0= x0y0.dot(g0);
        let d1= x1y0.dot(g1);
        let d2= x0y1.dot(g2);
        let d3= x1y1.dot(g3);

        let s = PerlinNoise.smooth3(g0.x);
        let t = PerlinNoise.smooth3(g0.y);

        let dx0 = PerlinNoise.interplote(d0,d1,s);
        let dx1 = PerlinNoise.interplote(d2,d3,s);

        let value = PerlinNoise.interplote(dx0,dx1,t);

        let chr = value >0 ? 1 : -1;
        
        // return Math.sqrt(Math.sqrt(Math.sqrt(Math.abs(value))));
        return value;

    }
    static randomGradient(x,y){


        let random = (2920 << 2) * Math.sin(x * 21942 + y * 171324 + 8912) * Math.cos(x * 23157 * y * 217832 * 9758);

        return new Vector(
            Math.cos(random),
            Math.sin(random)
        );
    }
    //平滑函数
    static smooth3(x){
        return 3 * Math.pow(x,2) - 2 * Math.pow(x,3);
    }
    static smooth4(x){
        return 4 * Math.pow(x,3) - 3 * Math.pow(x,4);
    }
    static interplote(x0,x1,w){
        return (x1 - x0) * w + x0;
    }
}