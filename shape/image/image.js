import { ShapeType } from "../../constant/Constant.js";
import Vector from "../../math/vector.js";

export class Color {

    static RED         =   'rgba(255,0,0,1)';
    static RED1         =   'rgba(255,0,0,.1)';
    static RED2         =   'rgba(255,0,0,.2)';
    static RED3         =   'rgba(255,0,0,.3)';
    static RED4         =   'rgba(255,0,0,.4)';
    static RED5         =   'rgba(255,0,0,.5)';
    static RED6         =   'rgba(255,0,0,.6)';
    static RED7         =   'rgba(255,0,0,.7)';
    static RED8         =   'rgba(255,0,0,.8)';
    static RED9         =   'rgba(255,0,0,.9)';

    static GREEN        =   'green'
    static BLUE         =   'blue';
    static LIGHTBLUE    =   'lightblue';
    static DARKBLUE     =   'darkblue';
    static PURPLE       =   'purple';
    static ORANGE       =   'orange';
    static BROWN        =   'brown';
    static XAXES        =   'rgba(255,0,0,.1)';
    static YAXES        =   'rgba(0,128,0,.1)';

    static XGRID        =   'rgba()';
    static YGRID        =   'rgba';

    static BLACK        =   'rgba(0,0,0, 1)';
    static BLACK1       =   'rgba(0,0,0,.1)';
    static BLACK2       =   'rgba(0,0,0,.2)';
    static BLACK3       =   'rgba(0,0,0,.3)';
    static BLACK4       =   'rgba(0,0,0,.4)';
    static BLACK5       =   'rgba(0,0,0,.5)';
    static BLACK6       =   'rgba(0,0,0,.6)';
    static BLACK7       =   'rgba(0,0,0,.7)';
    static BLACK8       =   'rgba(0,0,0,.8)';
    static BLACK9       =   'rgba(0,0,0,.9)';
    constructor(r=0,g=0,b=0,a=1){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    addColor(color){
        return new Color(
            this.r + color.r,
            this.g + color.g,
            this.b + color.b,
            
        );
    }
    //rgb to hex color
    toHEX(){

    }
    toHSL(){
        //rgb to HSL
    }

    toHSV(){
        //rgb to HSV
    }
    toString(){
        return `rgba(${this.r},${this.g},${this.b},${this.a})`
    }
}
export default class ImageMap extends ImageData{
    constructor(width,height,dx=0,dy=0){
        super(width,height);
        this.offset = new Vector(dx,dy);
        this.center = new Vector(width / 2,height / 2);
        this.scale = new Vector(1,1);
        this.rotation = 0;
        this.index = 0;
        this.type = ShapeType.IMAGEMAP;
    }
    setRGB(w,h,color){
        if(w > this.width || h > this.height)
            return;
        let index = h * this.width + w;
        this.data[index * 4 + 0] = color.r;
        this.data[index * 4 + 1] = color.g;
        this.data[index * 4 + 2] = color.b;
        this.data[index * 4 + 3] = 255;
    }
    getR(w,h){
        if(w > this.width || h > this.height || w < 0 || h < 0)
            return;
        let index = h * this.width + w;
        return this.data[index * 4 + 0];
    }
    getG(w,h){
        if(w > this.width || h > this.height || w < 0 || h < 0)
            return;
        let index = h * this.width + w;
        return this.data[index * 4 + 1];
    }
    getB(w,h){
        if(w > this.width || h > this.height || w < 0 || h < 0)
            return;
        let index = h * this.width + w;
        return this.data[index * 4 + 2];
    }
    getA(w,h){
        if(w > this.width || h > this.height || w < 0 || h < 0)
            return;
        let index = h * this.width + w;
        return this.data[index * 4 + 3];
    }
    setR(w,h,r){
        if(w > this.width || h > this.height || w < 0 || h < 0)
            return;
        let index = h * this.width + w;
        this.data[index * 4 + 0] = r;
    }
    setG(w,h,g){
        if(w > this.width || h > this.height || w < 0 || h < 0)
            return;
        let index = h * this.width + w;
        this.data[index * 4 + 1] = g;
    }
    setB(w,h,b){
        if(w > this.width || h > this.height || w < 0 || h < 0)
            return;
        let index = h * this.width + w;
        this.data[index * 4 + 2] = b;
    }
    setA(w,h,a){
        if(w > this.width || h > this.height || w < 0 || h < 0)
            return;
        let index = h * this.width + w;
        this.data[index * 4 + 3] = a
    }
    getRGB(w,h){
        if(w > this.width || h > this.height || w < 0 || h < 0)
            return;
        let index = h * this.width + w;
        let r = this.data[index * 4 + 0];
        let g = this.data[index * 4 + 1];
        let b = this.data[index * 4 + 2];
        let a = this.data[index * 4 + 3];
        return new Color(r,g,b,1);
    }
    //gray the picture
    toGray(){
        let copy = this.copy()
        for(let w=0;w<copy.width;++w){
            for(let h=0;h<copy.height;++h){
                let color = copy.getRGB(w,h);
                let total = (color.r + color.g + color.b) / 3;
                let c = new Color(total,total,total)
                copy.setRGB(w,h,c);
            }
        }
        return copy;
    }
    scale(vec){

    }
    toWave(){
        let waves = new Array(this.height);
        for(let h=0;h<this.height;++h){
            waves[h] = {red:[],green:[],blue:[]}
            for(let w=0;w<this.width;++w){
                let r = this.getR(w,h);
                let g = this.getG(w,h);
                let b = this.getB(w,h);
                waves[h].red.push(r);
                waves[h].green.push(g);
                waves[h].blue.push(b);
            }
        }
        return waves;
    }
    //just use the red channel 
    toRed(){
        let copy = this.copy()
        for(let w=0;w<copy.width;++w){
            for(let h=0;h<copy.height;++h){
                let color = copy.getRGB(w,h);
                color.g = color.r;
                color.b = color.r;
                copy.setRGB(w,h,color);
            }
        }
        return copy;
    }
    //just use the green channel
    toGreen(){
        let copy = this.copy()
        for(let w=0;w<copy.width;++w){
            for(let h=0;h<copy.height;++h){
                let color = copy.getRGB(w,h);
                color.r = color.g;
                color.b = color.g;
                copy.setRGB(w,h,color);
            }
        }
        return copy;
    }
    //just use the blue channel
    toBlue(){
        let copy = this.copy()
        for(let w=0;w<copy.width;++w){
            for(let h=0;h<copy.height;++h){
                let color = copy.getRGB(w,h);
                color.r = color.b;
                color.g = color.b;
                copy.setRGB(w,h,color);
            }
        }
        return copy;
    }
    static load(src,cb){
        //the rule of the encode of the format of the picture 
        /**
         * like jpg
         *      jpeg
         *      png
         *      gif
         *      ...etc
         */
        fetch(src)
            .then(d => {
                return d.arrayBuffer()
            })
            .then(d => {
                // console.log(d)
            })

        
        let img = new Image();
        img.src = src;
        img.onload = function(){
            
            let width = img.width;
            let height = img.height;
            let canvas = document.createElement('canvas');
            canvas.width = width + 2;
            canvas.height = height + 2;
            let pen = canvas.getContext('2d');
            pen.drawImage(img,0,0);
            let data = pen.getImageData(0,0,width,height).data;

            let mm = new ImageMap(width,height);
            
            for(let i=0;i<width * height * 4;++i){
                mm.data[i] = data[i];
            }

            cb(mm)
        }
    }
    static linear(x){
        return x;
    }
    static smooth(x){
        return 4 * Math.pow(x,3) - 3 * Math.pow(x,4);
    }
    compress(size){
        let width = this.width;
        let height = this.height;

        let nw = width / size;
        let nh = height / size;
        
        let img = new ImageMap(nw,nh);
        let count = size * size;

        let w,h,i,j;
        for(h = 0 ; h < height ; h += size){
            for(w = 0 ; w < width ; w += size){
                
                let c = new Color();
                for(i=0;i<size;++i){
                    for(j=0;j<size;++j){
                        if(w + i < width && h + j < height)
                            c = c.addColor(this.getRGB(w + i,h + j))
                    }
                }
                c.r /= count;
                c.g /= count;
                c.b /= count;
                img.setRGB(w / size,h / size,c);
            }
        }
        return img;
    }
    getPixelMap(){
        // for(let w=0;w<img.width;++w){
        //     for(let h=0;h<img.height;++h){
        //         let c = img.getRGB(w,h);
        //         // console.log(c)
        //         let pos = painter.c2s(new Vector(w,-h).add(new Vector(-img.width/2,img.height / 2)));
        //         let index = Number.parseInt(c.r / 255 * arr.length);
        //         painter.pen.fillText(arr[index],pos.x,pos.y);
        //         if(pos.x < lt.x)
        //             lt.x = pos.x - 12;
        //         if(pos.y < lt.y)
        //             lt.y = pos.y - 12;
        //         if(pos.x > rb.x)
        //             rb.x = pos.x + 12;
        //         if(pos.y > rb.y)
        //             rb.y = pos.y + 12;


        //     }
        // }
    }
    render(pen){
        pen.putImageData(this,this.offset.x + pen.canvas.width / 3,pen.canvas.height / 4 - this.offset.y);
    }
    copy(){
        let mm = new ImageMap(this.width,this.height);
        for(let i=0;i<this.width * this.height * 4;++i){
            mm.data[i] = this.data[i];
        }
        return mm;
    }
}


