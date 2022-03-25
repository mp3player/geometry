
class Scalar{
    applyScale(val){}   //用于缩放
}

class LinearScalar extends Scalar{          //将r1的范围缩放到r2的范围
    constructor(r1 , r2){
        super();
        this.r1 = r1;
        this.r2 = r2;
        this.factor = (r2.y - r2.x) / (r1.y - r1.x);
        this.bias = r2.x - this.factor * r1.x ;
    }
    applyScale(val){
        return this.factor * val + this.bias;
    }
}


export {LinearScalar}