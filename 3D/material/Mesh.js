import Object3D from "../object3D.js";

export default class Mesh extends Object3D{
    constructor(geometry,material){
        super();
        this.geometry = geometry;
        this.material = material;
    }
    update(){
        super.update();
        let p = this.geometry.position;
        let uv = this.geometry.uv;
        let ts = [];
        let bs = [];
        for(let i=0;i<p.length / 9;++i){
            let p0 = [ p[ i * 9 ] , p[ i * 9 + 1 ] , p[ i * 9 + 2 ] ];
            let p1 = [ p[ i * 9 + 3 ] , p[ i * 9 + 4 ] , p[ i * 9 + 5 ] ];
            let p2 = [ p[ i * 9 + 6 ] , p[ i * 9 + 7 ] , p[ i * 9 + 8 ] ];

            let uv0 = [ uv[ i * 6 ] , uv[ i * 6 + 1] ];
            let uv1 = [ uv[ i * 6 + 2 ] , uv[ i * 6 + 3] ];
            let uv2 = [ uv[ i * 6 + 4 ] , uv[ i * 6 + 5] ];

            // console.log(uv0,uv1,uv2);
            let duv0 = [ uv1[0] - uv0[0] , uv1[1] - uv0[1] ];
            let duv1 = [ uv2[0] - uv0[0] , uv2[1] - uv0[1] ];



            let dedge0 = [ p1[0] - p0[0] , p1[1] - p0[1] , p1[2] - p0[2] ];
            let dedge1 = [ p2[0] - p0[0] , p2[1] - p0[1] , p2[2] - p0[2] ];

            let f = 1 / (duv0[0] * duv1[1] - duv0[1] * duv1[0]);
            // console.log(f)
            let tx = f * (duv1[1] * dedge0[0] - duv0[1] * dedge1[0]);
            let ty = f * (duv1[1] * dedge0[1] - duv0[1] * dedge1[1]);
            let tz = f * (duv1[1] * dedge0[2] - duv0[1] * dedge1[2]);

            let bx = f * (-duv1[0] * dedge0[0] + duv0[0] * dedge1[0])
            let by = f * (-duv1[0] * dedge0[1] + duv0[0] * dedge1[1])
            let bz = f * (-duv1[0] * dedge0[2] + duv0[0] * dedge1[2])
            // console.log(f)

            ts.push(tx,ty,tz);
            ts.push(tx,ty,tz);
            ts.push(tx,ty,tz);

            bs.push(bx,by,bz);
            bs.push(bx,by,bz);
            bs.push(bx,by,bz);
        }
        this.tangant = ts;
        this.biTangant = bs;
    }
}