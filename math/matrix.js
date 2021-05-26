export default class Mat2{
    constructor(){
        this.mat = new Float32Array(1,0,0,1);
        this.coefficient = 2;
    }
}

export default class Mat3{
    constructor(){
        this.mat = new Float32Array(1,0,0,0,1,0,0,0,1);
        this.coefficient = 3;
    }
    setValue(i,j,val){
        let c = this.coefficient;
        this.mat[j * c + i] = val;
    }
    getValue(i,j){
        let c = this.coefficient;
        return this.mat[j * c + i];
    }
    add(mat){
        let c = this.coefficient;
        let mat = new Mat3();
        for(let i=0;i<c;++i){
            for(let j=0;j<c;++j){
                let v0 = this.getValue(i,j);
                let v1 = mat.getValue(i,j);
                mat.setValue(i,j,v0 + v1);
            }
        }
        return mat;
    }
    sub(mat){
        let c = this.coefficient;
        let mat = new Mat3();
        for(let i=0;i<c;++i){
            for(let j=0;j<c;++j){
                let v0 = this.getValue(i,j);
                let v1 = mat.getValue(i,j);
                mat.setValue(i,j,v0 - v1);
            }
        }
        return mat;
    }
    mul(mat){
        let mat = new Mat3();
        let t00 = this.mat[0]   ,   m00 = mat.data[0];
        let t01 = this.mat[1]   ,   m10 = mat.data[3];
        let t02 = this.mat[2]   ,   m20 = mat.data[6];

        let t10 = this.mat[3]   ,   m01 = mat.data[1];
        let t11 = this.mat[4]   ,   m11 = mat.data[4];
        let t12 = this.mat[5]   ,   m21 = mat.data[7];
        
        let t20 = this.mat[6]   ,   m02 = mat.data[2];
        let t21 = this.mat[7]   ,   m12 = mat.data[5];
        let t22 = this.mat[8]   ,   m22 = mat.data[8];
    
        let v00 = t00 * m00 + t01 * m10 + t02 * m20;
        let v01 = t00 * m01 + t01 * m11 + t02 * m21;
        let v02 = t00 * m02 + t01 * m12 + t02 * m22;

        let v10 = t10 * m00 + t11 * m10+ t12 * m20
        let v11 = t10 * m01 + t11 * m11+ t12 * m21
        let v12 = t10 * m02 + t11 * m12+ t12 * m22;

        let v20 = t20 * m00 + t21 * m10 + t22 * m20;
        let v21 = t20 * m01 + t21 * m11 + t22 * m21;
        let v22 = t20 * m02 + t21 * m12 + t22 * m22;
         
         mat.data = new Float32Array(v00,v01,v02,v10,v11,v12,v20,v21,v22);

         return mat;
         

    }
    det(){
        let a = this.data;
        let a00 = a[0],
            a01 = a[1],
            a02 = a[2];
        let a10 = a[3],
            a11 = a[4],
            a12 = a[5];
        let a20 = a[6],
            a21 = a[7],
            a22 = a[8];
        return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
    }
    invert(){
        let a = this.data;
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2];
        var a10 = a[3],
            a11 = a[4],
            a12 = a[5];
        var a20 = a[6],
            a21 = a[7],
            a22 = a[8];
        var b01 = a22 * a11 - a12 * a21;
        var b11 = -a22 * a10 + a12 * a20;
        var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

        var det = a00 * b01 + a01 * b11 + a02 * b21;

        if (!det) {
            return null;
        }

        det = 1.0 / det;
        out[0] = b01 * det;
        out[1] = (-a22 * a01 + a02 * a21) * det;
        out[2] = (a12 * a01 - a02 * a11) * det;
        out[3] = b11 * det;
        out[4] = (a22 * a00 - a02 * a20) * det;
        out[5] = (-a12 * a00 + a02 * a10) * det;
        out[6] = b21 * det;
        out[7] = (-a21 * a00 + a01 * a20) * det;
        out[8] = (a11 * a00 - a01 * a10) * det;
        let mat = new Mat3();
        mat.data = out;
        return mat;
    }
    translate(vec){
        
    }
    rotate(){

    }
    scale(){

    }
}

export default class Mat4{
    constructor(){
        this.data = new Float32Array(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
        this.coefficient = 4;
    }
    det(){
        let a = this.data;
        let a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3];
        let a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7];
        let a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11];
        let a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15];
        let b00 = a00 * a11 - a01 * a10;
        let b01 = a00 * a12 - a02 * a10;
        let b02 = a00 * a13 - a03 * a10;
        let b03 = a01 * a12 - a02 * a11;
        let b04 = a01 * a13 - a03 * a11;
        let b05 = a02 * a13 - a03 * a12;
        let b06 = a20 * a31 - a21 * a30;
        let b07 = a20 * a32 - a22 * a30;
        let b08 = a20 * a33 - a23 * a30;
        let b09 = a21 * a32 - a22 * a31;
        let b10 = a21 * a33 - a23 * a31;
        let b11 = a22 * a33 - a23 * a32; // Calculate the determinant
    
        return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      }
}