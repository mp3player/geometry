import Vector from '../math/vector.js'

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
function c2s_t(vec,t){      //transform with the translate 
    let sx = vec.x + innerWidth / 2;
    let sy = innerHeight / 2 - vec.y;
    
    return new Vector(sx+t.x,sy+t.y);
}
function c2s_r(vec,r){      //transform with the rotation
    
}
function c2s_s(vec,s){      //transform with the scale

}

export default {
    c2s,s2c
}

export {c2s,s2c}