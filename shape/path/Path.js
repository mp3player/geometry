import Shape from "../Shape.js";

class Path extends Shape {
    constructor(path , props){
        super(props);
        this.path = path;
        this.Type = Shape.PATH;
    }
}

export {Path}