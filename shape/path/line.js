import Shape from "../shape.js";

export default class line extends Shape {
    constructor(points,props){
        super(props);
        this.type = 'line';
        this.points = points;
    }
}