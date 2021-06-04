import Material from "../material/Material.js";
import Mesh from "../material/Mesh.js";
import Geometry from "../material/Geometry.js";

class ObjLoader {
    load(url,cb){
        fetch(url)
            .then(d => d.text())
            .then(d => {
                let o = this.parse(d);
                cb(o);
            })
    }
    parse(d){
        const p_explanatory = /^#/;     //explanatory
        const p_position = /^v /;       //position
        const p_normal = /^vn /;        //normal
        const p_uv = /^vt /;            //uv
        const p_face = /^f /;           //index

        let res = d.split('\n');

        let position = [];
        let normal = [];
        let uv = [];
        let index = [];

        res.forEach(d => {
            if(p_explanatory.test(d)){
                d = d.replace('#','');
            }
            else if(p_position.test(d)){
                d = d.replace(/v /g,'').split(/\s/);
                let arr = [Number(d[0]),Number(d[1]),Number(d[2])]
                position.push(arr)
            }
            else if(p_normal.test(d)){
                d = d.replace(/vn /g,'').split(/\s/);
                let arr = [Number(d[0]),Number(d[1]),Number(d[2])]
                normal.push(arr);
            }
            else if(p_uv.test(d)){
                d = d.replace(/vt /g,'').split(/\s/);
                let arr = [Number(d[0]),Number(d[1])];
                uv.push(arr);
            }
            else if(p_face.test(d)){
                // console.log(d)
                d = d.replace(/f /g,'').split(/[\s]/);
                // console.log(d)
                let pi = [];
                let ui = [];
                let ni = [];
                d.forEach(e => {
                    e = e.split(/\//);
                    pi.push(Number(e[0]) - 1);
                    ui.push(Number(e[1]) - 1);
                    ni.push(Number(e[2]) - 1);
                })
                index.push({pi,ui,ni})
            }

        })
        let p = [],u = [],n = [];

        for(let i=0;i<index.length;++i){
            let item = index[i];
            let pIndex = item.pi;
            let uIndex = item.ui;
            let nIndex = item.ni;
            
            p = p.concat(position[pIndex[0]])
            p = p.concat(position[pIndex[1]])
            p = p.concat(position[pIndex[2]])

            u = u.concat(uv[uIndex[0]])
            u = u.concat(uv[uIndex[1]])
            u = u.concat(uv[uIndex[2]])

            n = n.concat(normal[nIndex[0]])
            n = n.concat(normal[nIndex[1]])
            n = n.concat(normal[nIndex[2]])
            
        }

        position = p;
        normal = n;
        uv = u;

        // return {
        //     position,normal,uv
        // };

        return new Mesh(
            new Geometry(position,uv,normal),
            new Material
        );
    }
}

export default ObjLoader;

export {ObjLoader}
