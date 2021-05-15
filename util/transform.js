import Vector from '../math/vector.js'

/**
 * the util used to transform the coordinate 
 */

function c2s(vec){
    let sx = vec.x + innerWidth / 2;
    let sy = innerHeight / 2 - vec.y;
    
    return new Vector(sx,sy);
}
function s2c(vec){
    let cx = vec.x - innerWidth / 2;
    let cy = innerHeight / 2 - vec.y;

    return new Vector(cx,cy);
}

//-------------------------

function c2s_t(vec,origin,zoom){
    let sx = vec.x * zoom + innerWidth / 2 + origin.x ;
    let sy = innerHeight / 2 - vec.y * zoom - origin.y ;
    
    return new Vector(sx,sy);
}
function s2c_t(vec,origin,zoom){
    let cx = (vec.x  - innerWidth / 2 - origin.x) / zoom ;
    let cy = (innerHeight / 2 - vec.y - origin.y) / zoom ;

    return new Vector(cx,cy);
}

//------------------------------------


export default {
    c2s,s2c,c2s_t,s2c_t
}

export {c2s,s2c,c2s_t,s2c_t}