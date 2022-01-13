
function isInBoxRect(vect , rect){
    
}

function isInPolygon(vert , poly){
    /**
     * vert = Vector
     * poly = Array:Vector
     * 
     */
    let length = poly.length ;
    let res = false;
    for( let j = length - 1 , i = 0 ; i < length ; j = i++ ){
        let p0 = poly[j];
        let p1 = poly[i];

        //TODO
        //未考虑与顶点共线的情况，之后补全

        if( (vert.x - p0.x) * (vert.x - p1.x) < 0 && (p1.y - p0.y) / (p1.x - p0.x) * (vert.x - p0.x) + p0.y > vert.y ){
            res = !res;
        }
    }
    return res;
}

function isInCircle(vert , circle){
    /**
     * vert = Vector
     * poly = {center , radius}
     * (vert - center).length < radius ? true : false
     * 
     */
    let dis = vert.sub(circle.center);
    let squaLen = dis.squaLen();
    let squaR = circle.r * circle.r;
    return (squaLen <= squaR)
}

function isInPath(vert , path){
    /**
     * vert = Vector
     * poly = Array:Vector
     * 
     */



}

const Geometry = {
    isInPolygon , isInCircle , isInPath
}

export default Geometry
export {isInPolygon , isInCircle , isInPath}