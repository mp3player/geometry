import {VertexShader,FragmentShader} from './BasicShader.js'
import {VERSION,PRECISION,MATRIX,LIGHT,LIGHT_COLOR_MIXTURE,SHADOW_UNIFORM,SHADOW_MIXTURE,BLUR,MATH} from './ShaderLib.js'

function preCompileShaderCode(shader){
    while((/(#include<([\w]+)>)/).test(shader)){
        shader = shader.replace(RegExp.$1,d => {
            return eval(RegExp.$2.toUpperCase())
        })
    }
    return shader
}

function getShaderCode(material){
    let useMap = material.map ? '#define USE_MAP \n' : '';
    let useNormalMap = material.normalMap ? '#define USE_NORMAL_MAP \n' : '';
    let useShadowMap = material.receiveShadow ? '#define USE_SHADOW_MAP \n' : '';
    let useLight = material.useLight ? '#define USE_LIGHT\n' : ''
    

    let vertexDefine = ''
    let fragmentDefine = useMap + useNormalMap + useLight + useShadowMap;

    let vCode = preCompileShaderCode(VertexShader);
    let fCode = preCompileShaderCode(FragmentShader);

    vCode = vCode.replace('#START_VERTEX_DEFINE',vertexDefine);
    fCode = fCode.replace('#START_FRAGMENT_DEFINE',fragmentDefine);

    return [vCode,fCode];
}
export {preCompileShaderCode,getShaderCode}