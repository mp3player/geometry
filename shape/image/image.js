export class Color {

    static RED          =   'rgba(255,0,0,1)';
    static RED2         =   'rgba(255,0,0,.2)';
    static RED4         =   'rgba(255,0,0,.4)';
    static RED6         =   'rgba(255,0,0,.6)';
    static RED8         =   'rgba(255,0,0,.8)';

    static GREEN        =   'green'
    static BLUE         =   'blue';
    static LIGHTBLUE    =   'lightblue';
    static DARKBLUE     =   'darkblue';
    static PURPLE       =   'purple';
    static ORANGE       =   'orange';
    static BROWN        =   'brown';

    static BLACK        =   'rgba(0,0,0, 1)';
    static BLACK2       =   'rgba(0,0,0,.2)';
    static BLACK4       =   'rgba(0,0,0,.4)';
    static BLACK6       =   'rgba(0,0,0,.6)';
    static BLACK8       =   'rgba(0,0,0,.8)';

    static TRANSPARENT  =   'rgba(0,0,0,0)';


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
    toString(){
        return `rgba(${this.r},${this.g},${this.b},${this.a})`
    }
}
