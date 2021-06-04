import Material from "../material/Material.js"
import {VERSION,PRECISION,MATRIX,LIGHT,LIGHT_COLOR_MIXTURE,SHADOW_UNIFORM} from './ShaderLib.js'


const VertexShader = `#include<version>
#include<precision>

//用于定义define变量
#START_VERTEX_DEFINE

#include<matrix>

layout(location = 0) in vec3 position;
layout(location = 1) in vec2 uv;
layout(location = 2) in vec3 normal;
layout(location = 3) in vec3 tangant;
layout(location = 4) in vec3 bitangant;

out vec3 oPosition;
out vec2 oUv;
out vec3 oNormal;
out vec3 oTangant;
out vec3 oBitangant;

void main(){
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0f);
    oPosition = position;
    oUv = uv;
    oNormal = normal;
    oTangant = tangant;
    oBitangant = bitangant;
}
`
const FragmentShader = `#include<version>
#include<precision>

#START_FRAGMENT_DEFINE

#include<light> 
#include<matrix>
#include<shadow_uniform>

uniform vec3 color;
uniform sampler2D map;
uniform sampler2D normalMap;
uniform vec3 cameraPosition;

in vec3 oPosition;
in vec2 oUv;
in vec3 oNormal;
in vec3 oTangant;
in vec3 oBitangant;

#include<light_color_mixture>

out vec4 FragColor ;
void main(){
    vec3 fColor = color;
    vec3 normal = normalMatrix * oNormal;
    #ifdef USE_MAP
        fColor *= texture(map,oUv).rgb;
    #endif

    #ifdef USE_NORMAL_MAP
        mat3 tbn = mat3(oTangant,oBitangant,normalize(oNormal));
        normal = normalMatrix *(tbn * (2.0f * texture(normalMap,oUv).xyz - vec3(1.0f)));
    #endif

    #ifdef USE_LIGHT
        vec3 aColor = aLightMixtureDiff(fColor,aLight);
        vec3 dColor = dLightMixtureDiff(fColor,normal,dLight);
        vec3 sColor = sLightMixtureDiff(fColor,normal,sLight);
        vec3 pColor = pLightMixtureDiff(fColor,normal,pLight);

        fColor = aColor + dColor + sColor + pColor;
    #endif

    #ifdef USE_SHADOW_MAP
        //将顶点变换到阴影空间
        vec4 position = shadowProjectionMatrix * shadowViewMatrix * modelMatrix * vec4(oPosition,1.0f);;
        //将齐次坐标转换为普通坐标
        vec3 coord = position.xyz * 1.0f / position.w;
        //变换顶点到uv空间
        vec2 uv = coord.xy * .5 + vec2(.5f);
        //计算深度
        float depth = texture(shadowMap,uv).r;
        float currentDepth = position.z / position.w;
        //和当前深度比较
        if(depth > currentDepth){
            FragColor = vec4(vec3(0.0f),1.0f);
        }else{
            FragColor = vec4(fColor,1.0f);
        }
        // FragColor = vec4(vec3(1.0f) - texture(shadowMap,oUv).rgb,1.0f);
    #else 
        FragColor = vec4(fColor,1.0f);
    #endif

}
`


export {VertexShader,FragmentShader}