
//邻接矩阵表示的图

import { _Math } from "./Math.js";

//表示图中的点
class Vertex{
    constructor(name = 'vert' , info = null){
        this.name = name;
        this.info = info;           //记录顶点的某些信息
    }
}
//带权图
class Graph{
    constructor(vert = 0 , type = Graph.DAG){
        this.jointMat = null;
        this.verts = null;
        this.maxCount = vert;
        this.count = 0;
        this.type = type;

        this.init();
    }
    init(){
        //initial the joint mat
        this.jointMat = new Array(this.maxCount);
        for(let i = 0 ; i < this.maxCount ; ++ i){
            let col = new Array(this.maxCount).fill(Graph.MAX_WEIGHT);
            this.jointMat[i] = col;
        }
        //initial the vert array
        this.verts = [];
    }
    add(vert){
        //添加点到该图中
        if(this.count < this.maxCount){
            this.verts.push(vert);
            this.count += 1;
            return true;
        }
        return false;
    }
    connect(i,j,w = 1){
        if(i >= this.count || j >= this.count)
            return false;

        if(this.type == Graph.DAG)      //有向图
            this.setEdge(i,j,w);
        else                            //无向图
            this.setEdge(i,j,w),this.setEdge(j,i,w);

        return true;    
    }
    nearest(i){
        //找到离i最近的点
        let path = this.jointMat[i];
        let near = _Math.min(path);
        return near;
    }
    out(){
        for(let i = 0 ; i < this.maxCount ; ++ i){
            console.log(this.jointMat[i]);
        }
    }
    getVert(i){
        if(i > this.count)
            return null;
        return this.verts[i];
    }
    getEdge(x,y){
        if(x > this.maxCount || y > this.maxCount)
            return null;
        return this.jointMat[x][y];
    }
    setEdge(x,y,v){
        if(x > this.maxCount || y > this.maxCount)
            return false;
        this.jointMat[x][y] = v;
        return true;
    }

    static DAG          =       0;          //有向图标志
    static UDAG         =       1;          //无向图标志
    static MAX_WEIGHT   =       Infinity    //最大权重
}

export {Vertex , Graph}