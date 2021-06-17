import Material from "../material/Material.js"
import {VERSION,PRECISION,MATRIX,LIGHT,LIGHT_COLOR_MIXTURE,SHADOW_UNIFORM} from './ShaderLib.js'


const VertexShader = `#include<version>
#include<precision>

//用于定义define变量
//START_VERTEX_DEFINE

#include<matrix>
#include<shadow_uniform>

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

//START_FRAGMENT_DEFINE

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
    
    vec3 aColor = aLightMixtureDiff(fColor,aLight);
    #ifdef USE_LIGHT
        
        vec3 dColor = dLightMixtureDiff(fColor,normal,dLight);
        vec3 sColor = sLightMixtureDiff(fColor,normal,sLight);
        vec3 pColor = pLightMixtureDiff(fColor,normal,pLight);

        fColor = dColor + sColor + pColor;


    #endif

    vec3 shadowColor = vec3(1.0f);

    #ifdef USE_SHADOW_MAP
        //将顶点变换到阴影空间
        vec4 position = shadowProjectionMatrix * shadowViewMatrix * modelMatrix * vec4(oPosition,1.0f);;
        //将齐次坐标转换为普通坐标
        vec3 coord = position.xyz / position.w;
        //变换顶点到uv空间
        vec2 uv = coord.xy * 0.5f + vec2(0.5f);
        //计算深度
        float depth = texture(shadowMap,uv).r + .005;
        float currentDepth = position.z / position.w;
        //和当前深度比较
        if(depth < currentDepth){
            shadowColor = vec3(0.2f);
        }else{
            shadowColor = vec3(1.0f);
        }

    #endif

    FragColor = vec4(aColor + shadowColor * fColor,1.0f);
}
`
const BufferVertexShader = `#include<version>
#include<precision>

layout(location = 0)in vec2 position;
layout(location = 1)in vec2 uv;

out vec2 oUv;
out vec2 oPosition;

void main(){
    gl_PointSize = 10.0f;
    gl_Position = vec4(position,0.0f,1.0f);
    oUv = uv;
    oPosition = position;
}
`
const BufferFragmentShader = `#include<version>
#include<precision>

uniform sampler2D map;

in vec2 oPosition;
in vec2 oUv;
out vec4 FragColor ;

void main(){
    FragColor = texture(map,oUv);
}
`

const VBlurVertexShader = `#include<version>
#include<precision>

layout(location = 0) in vec2 position;
layout(location = 1) in vec2 uv;

out vec2 oUv;

void main(){
    gl_Position = vec4(position,0.0f,1.0f);
    oUv = uv;
}

`
const VBlurFragmentShader = `#include<version>
#include<precision>

//用于定义define变量
//START_VERTEX_DEFINE

uniform sampler2D map;
uniform float width;
uniform float height;

in vec2 oUv;
out vec4 FragColor;

#include<blur>

void main(){
    FragColor = vec4(vBlur(oUv,height,10.0f),1.0f);
}
`

const HBlurVertexShader = `#include<version>
#include<precision>

layout(location = 0) in vec2 position;
layout(location = 1) in vec2 uv;

out vec2 oUv;

void main(){
    gl_Position = vec4(position,0.0f,1.0f);
    oUv = uv;
}

`
const HBlurFragmentShader = `#include<version>
#include<precision>

//用于定义define变量
//START_VERTEX_DEFINE

uniform sampler2D map;
uniform float width;
uniform float height;

in vec2 oUv;
out vec4 FragColor;

#include<blur>

void main(){
    FragColor = vec4(hBlur(oUv,height,10.0f),1.0f);
}
`

const BloomVertexShader = `#include<version>
#include<precision>

layout(location = 0)in vec2 position;
layout(location = 1)in vec2 uv;

out vec2 oUv;
void main(){    
    gl_Position = vec4(position,0.0f,1.0f);
    oUv = uv;
}

`
const BloomFragmentShader = `#include<version>
#include<precision>

uniform sampler2D map;

in vec2 oUv;
out vec4 FragColor ;
void main(){
    vec3 color = texture(map,oUv).rgb;
    float brightness = dot(color,vec3(0.3126, 0.7152, 0.322));
    if(brightness > 1.0f)
        FragColor = texture(map,oUv);
    else
        FragColor = vec4(vec3(0.0f),1.0f);
}
`

export {
    VertexShader,
    FragmentShader,
    BufferVertexShader,
    BufferFragmentShader,
    VBlurVertexShader,
    VBlurFragmentShader,
    HBlurVertexShader,
    HBlurFragmentShader,
    BloomVertexShader,
    BloomFragmentShader
}