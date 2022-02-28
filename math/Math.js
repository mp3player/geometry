import { DataType } from "../util/Type.js";
import Vector from "./Vector.js";

class _Math {
    static max(array){
        let index = -1 , val = Infinity;
        for(let i = 0 ; i < array.length ; ++ i){
            if(val < array[i]){
                index = i ; 
                val = array[i]
            }
        }
        return {index,val};
    }

    static min(array){
        let index = -1 , val = Infinity;
        for(let i = 0 ; i < array.length ; ++ i){
            if(val > array[i]){
                index = i ; 
                val = array[i]
            }
        }
        return {index,val};
    }

    static interplote(start , end , lambda){
        // the start has equal class type with end
        if(DataType.getType(start) != DataType.getType(end))        
            return null;
            
        if(DataType.isNumber(start))                            // number
            return (end - start) * lambda + start;
        if(DataType.isInstance(start , Vector))                 // vector
            return end.sub(start).scale(lambda).add(start);
        
        return null;
    }
}

export {_Math}