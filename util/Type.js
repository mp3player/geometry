
const type = {
    
}

class DataType {
    static isNumber(data){
        return Object.prototype.toString.call(data) == DataType.NUMBER;
    }

    static isString(data){
        return Object.prototype.toString.call(data) == DataType.STRING;
    }

    static isObject(data){
        return Object.prototype.toString.call(data) == DataType.OBJECT;
    }

    static isArray(data){
        return Object.prototype.toString.call(data) == DataType.ARRAY
    }

    static isSymbol(data){
        return Object.prototype.toString.call(data) == DataType.SYMBOL;
    }

    static getType(data){
        if(this.isNumber(data)) return DataType.NUMBER;
        if(this.isString(data)) return DataType.STRING;
        if(this.isObject(data)) return DataType.OBJECT;
        if(this.isArray(data))  return DataType.ARRAY;
        if(this.isSymbol(data)) return DataType.SYMBOL;
        
        return null;
    }

    static isInstance(instance , type){
        return instance instanceof type;
    }

    static NUMBER   =   '[object Number]';
    static STRING   =   '[object String]';
    static OBJECT   =   '[object Object]';
    static ARRAY    =   '[object Array]';
    static SYMBOL   =   '[object Symbol]';
}


export {DataType}



