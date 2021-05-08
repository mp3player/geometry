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
        this.g = b;
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
    constructor(width,height){
        super(width,height);
        // this.data = new Uint8ClampedArray(width * height * 4);
    }
    setRGB(w,h,color){
        if(w > this.width || h > this.height)
            return;
        let index = h * this.width + w;
        this.data[index * 4 + 0] = color.r;
        this.data[index * 4 + 1] = color.g;
        this.data[index * 4 + 2] = color.b;
        this.data[index * 4 + 3] = color.a * 255;
    }
    getRGB(w,h){
        if(w > this.width || h > this.height)
            return;
        let index = h * this.width + w;
        let r = this.data[index * 4 + 0];
        let g = this.data[index * 4 + 1];
        let b = this.data[index * 4 + 2];
        let a = this.data[index * 4 + 3];
        return new Color(r,g,b,a/255);
    }
    //gray the picture
    toGray(){

    }
    //just use the red channel 
    toRed(){
        
        for(let w=0;w<this.width;++w){
            for(let h=0;h<this.height;++h){
                let color = this.getRGB(w,h);
                color.g = color.r;
                color.b = color.r;
                this.setRGB(w,h,color);
            }
        }
    }
    //just use the green channel
    toGreen(){
        for(let w=0;w<this.width;++w){
            for(let h=0;h<this.height;++h){
                let color = this.getRGB(w,h);
                color.r = color.g;
                color.b = color.g;
                this.setRGB(w,h,color);
            }
        }
    }
    //just use the blue channel
    toBlue(){
        for(let w=0;w<this.width;++w){
            for(let h=0;h<this.height;++h){
                let color = this.getRGB(w,h);
                color.r = color.b;
                color.g = color.b;
                this.setRGB(w,h,color);
            }
        }
    }
    load(src){
        //the rule of the encode of the format of the picture 
        /**
         * like jpg
         *      jpeg
         *      png
         *      gif
         *      ...etc
         */
        // fetch(src)
        //     .then(d => {
        //         return d.arrayBuffer()
        //     })
        //     .then(d => {
        //         console.log(d)
        //     })
    }
    render(pen,dx,dy){
        pen.putImageData(this,dx,dy)
    }

}


