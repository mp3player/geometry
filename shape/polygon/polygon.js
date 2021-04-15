import Shape from "../shape.js";

export default class Polygon extends Shape {
    constructor(points,props){
        super(props);
        this.points = points;
        this.type = 'polygon';
    }
}