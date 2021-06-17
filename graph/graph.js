export class Vertex {
    constructor(index,info){
        this.index = index;
        this.info = info;
    }
}

export default class Graph {
    constructor(size,type){
        this.size = size;
        this.vertexes = [];
        this.path = [];
        this.type = type;
    }
    init(){
        this.vertexes = new Array(this.size);
        this.path = new Array(this.size);
        for(let i=0;i<this.size;++i){
            this.path[i] = new Array(this.size);
        }

    }
    //最小生成树
    kruskal(){

    }
    prim(){
        
    }
    //最短路径
    dijstla(){

    }
    floyd(){


    }
}

Graph.DG = 'DG';        //directional graph
Graph.UDG = 'UDG';      //undirectional graph
