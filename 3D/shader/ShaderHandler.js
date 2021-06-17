import { glMatrix } from '../../math/gl-matrix/index.js'
import Material from '../material/Material.js'
import {VertexShader,FragmentShader} from './BasicShader.js'
import {VERSION,PRECISION,MATRIX,LIGHT,LIGHT_COLOR_MIXTURE,SHADOW_UNIFORM,BLUR,MATH} from './ShaderLib.js'

function preCompileShaderCode(shader){
    while((/(#include<([\w]+)>)/).test(shader)){
        shader = shader.replace(RegExp.$1,d => {
            return eval(RegExp.$2.toUpperCase())
        })
    }
    return shader
}

function getShaderCode(material){
    
    let defines = material.defines;
    let define = '';
    for(let i in defines){
        let key = i;
        if(defines[i].value){
            key = key.replace(/[A-Z]/g , d => {
                return '_'+d;
            })
            key = key.toUpperCase();
            define += '#define ' + key + '\n';
        }
    }

    let vertexDefine = ''
    let fragmentDefine = define;
    if(material instanceof Material){
        let vCode = preCompileShaderCode(VertexShader);
        let fCode = preCompileShaderCode(FragmentShader);

        vCode = vCode.replace('//START_VERTEX_DEFINE',vertexDefine);
        fCode = fCode.replace('//START_FRAGMENT_DEFINE',fragmentDefine);
        
        return [vCode,fCode];
    }else{
        let vCode = preCompileShaderCode(material.shaderCode.vertex);
        let fCode = preCompileShaderCode(material.shaderCode.fragment);

        vCode = vCode.replace('//START_VERTEX_DEFINE',vertexDefine);
        fCode = fCode.replace('//START_FRAGMENT_DEFINE',fragmentDefine);

        return [vCode,fCode];
    }


}
export {preCompileShaderCode,getShaderCode}