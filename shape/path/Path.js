import Shape from "../Shape.js";

class Path extends Shape {
    constructor(props){
        super(props)
        this.Type = Shape.PATH;
    }
}

export {Path}