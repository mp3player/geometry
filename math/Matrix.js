//一个3 x3 的矩阵，用来计算二维空间中的仿射变换
//与一个向量做乘法时，需要将向量变换到齐次坐标进行计算

/**
 * |a , b , c|
 * |d , e , f|
 * |g , h , i|
 * 
 */
import Vector2 from './Vector.js'

export default class Matrix{
    constructor(a = 1 , b = 0 , c = 0 , d = 0 ,e = 1 , f = 0 , g = 0 , h = 0 , i = 1){
        this.mat = new Float32Array([a,b,c,d,e,f,g,h,i]);
    }
    
    applyRotation(rotation){
        let cos = Math.cos(rotation);
        let sin = Math.sin(rotation);

        let rotateMatrix = new Matrix( cos , -sin,0,
                                    sin , cos , 0);
        return rotateMatrix.multiply(this);
    }
    
    applyTranslation(translation){
        let translateMatrix = new Matrix();
        translateMatrix.set(0,2,translation.x);
        translateMatrix.set(1,2,translation.y);
        return translateMatrix.multiply(this);
    }
    
    applyScalar(scalar){
        let scaleMatrix = new Matrix(scalar.x, 0 , 0 ,
                                     0, scalar.y , 0);
        return scaleMatrix.multiply(this);
    }
    
    applyTransform(vec){
        let x = this.get(0,0) * vec.x + this.get(0,1) * vec.y + this.get(0,2);
        let y = this.get(1,0) * vec.x + this.get(1,1) * vec.y + this.get(1,2);
        return new Vector2(x,y);
    }
    
    add(mat){
        let a = this.get(0,0) + mat.get(0,0);
        let b = this.get(0,1) + mat.get(0,1);
        let c = this.get(0,2) + mat.get(0,2);
        
        let d = this.get(1,0) + mat.get(1,0);
        let e = this.get(1,1) + mat.get(1,1);
        let f = this.get(1,2) + mat.get(1,2);
        
        let g = this.get(2,0) + mat.get(2,0);
        let h = this.get(2,1) + mat.get(2,1);
        let i = this.get(2,2) + mat.get(2,2);

        return new Matrix(a,b,c,d,e,f,g,h,i);
    }
    
    multiply(mat){
        let a = this.get(0,0) * mat.get(0,0) + this.get(0,1) * mat.get(1,0) + this.get(0,2) * mat.get(2,0);
        let b = this.get(0,0) * mat.get(0,1) + this.get(0,1) * mat.get(1,1) + this.get(0,2) * mat.get(2,1);
        let c = this.get(0,0) * mat.get(0,2) + this.get(0,1) * mat.get(1,2) + this.get(0,2) * mat.get(2,2);

        let d = this.get(1,0) * mat.get(0,0) + this.get(1,1) * mat.get(1,0) + this.get(1,2) * mat.get(2,0);
        let e = this.get(1,0) * mat.get(0,1) + this.get(1,1) * mat.get(1,1) + this.get(1,2) * mat.get(2,1);
        let f = this.get(1,0) * mat.get(0,2) + this.get(1,1) * mat.get(1,2) + this.get(1,2) * mat.get(2,2);

        let g = this.get(2,0) * mat.get(0,0) + this.get(2,1) * mat.get(1,0) + this.get(2,2) * mat.get(2,0);
        let h = this.get(2,0) * mat.get(0,1) + this.get(2,1) * mat.get(1,1) + this.get(2,2) * mat.get(2,1);
        let i = this.get(2,0) * mat.get(0,2) + this.get(2,1) * mat.get(1,2) + this.get(2,2) * mat.get(2,2);

        return new Matrix(a,b,c,d,e,f,g,h,i);
    }
    
    det(){
        let [a,b,c,d,e,f,g,h,i] = this.mat;

        return a * (e * i - h * f) - b * (d * i - f * g) + c * (d * h - e * g);
    }
    
    scale(s){
        let a = this.get(0,0) * s;
        let b = this.get(0,1) * s;
        let c = this.get(0,2) * s;

        let d = this.get(1,0) * s;
        let e = this.get(1,1) * s;
        let f = this.get(1,2) * s;

        let g = this.get(2,0) * s;
        let h = this.get(2,1) * s;
        let i = this.get(2,2) * s;

        return new Matrix(a,b,c,d,e,f,g,h,i);
    }
    
    transpose(){
        let a = this.get(0,0);
        let b = this.get(0,1);
        let c = this.get(0,2);

        let d = this.get(1,0);
        let e = this.get(1,1);
        let f = this.get(1,2);

        let g = this.get(2,0);
        let h = this.get(2,1);
        let i = this.get(2,2);

        return new Matrix(a,d,g,b,e,h,c,f,i);

    }
    
    invert(){
        let c = this.conj();
        let d = this.det();
        return c.scale(1 / d);
    }

    conj(){
        let [a,b,c,d,e,f,g,h,i] = this.mat;

        let A = e * i - f * h,
            B = b * i - c * h,
            C = b * f - c * e,

            D = d * i - f * g,
            E = a * i - c * g,
            F = a * f - c * d,

            G = d * h - e * g,
            H = a * h - b * g,
            I = a * e - b * d;


        return new Matrix(A , -B , C , -D , E , -F , G , -H , I);
    }
    
    copy(){
        let ele = this.mat.toString().split(',');
        return Matrix.fromArray(ele);
    }
    
    set(i,j,val){
        this.mat[i * 3 + j] = val;
    }
    
    get(i,j){
        return this.mat[i * 3 + j];
    }

    getRotation(){
        return new Matrix(  this.get(0,0) , this.get(0,1),0,
                            this.get(1,0) , this.get(1,1) ,0);
    }

    

    static lookAt(vec){
        if(vec.length() <= 0)
            return new Matrix();

        let com = vec.toComplex();
        return com.arg();
    }
    
    static fromArray(arr){
        return new Matrix(...arr);
    } 
    
    static ApplyRotation(vec , rotation){
        let rotateMatrix = new Matrix();
        rotateMatrix = rotateMatrix.applyRotation(rotation);
        return rotateMatrix.multiply(vec);
    }
    
    static ApplyTranslation(vec , translation){
        let translateeMatrix = new Matrix();
        translateMatrix = translateeMatrix.applyTranslation(translation);
        return translateMatrix.multiply(vec);
    }
    
    static ApplyScalar(vec , scalar){
        let scalarMatrix = new Matrix();
        scalarMatrix = scalarMatrix.applyScalar(scalar);
        return scalarMatrix.multiply(vec);
    }
    
    static ApplyTransform(vec , transform){
        return transform.applyTransform(vec);
    }
}
