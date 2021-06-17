const VERSION = '#version 300 es';
const PRECISION = 'precision lowp float;'
const MATRIX = `
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat3 normalMatrix;
`
const LIGHT = `
struct ALight {
    vec3 color;
    float intensity;
};
struct DLight {
    vec3 color;
    float intensity;
    vec3 direction;
};
struct SLight {
    vec3 color;
    float intensity;
    vec3 position;
    vec3 target ;
    float scale;
};
struct PLight {
    vec3 color;
    float intensity;
    vec3 position;
    float energy;
};

uniform ALight aLight;
uniform DLight dLight;
uniform SLight sLight;
uniform PLight pLight;
`

const LIGHT_COLOR_MIXTURE = `
vec3 aLightMixtureDiff(vec3 color,ALight light){
    return color * light.color * light.intensity;
}
vec3 dLightMixtureDiff(vec3 color,vec3 normal,DLight light){
    float factor = max(0.0f,dot(normalize(normal),normalize(-light.direction)));

    return color * factor * light.color * light.intensity;
}
vec3 sLightMixtureDiff(vec3 color,vec3 normal,SLight light){
    vec3 ray = normalize(oPosition - light.position);
    vec3 shot = normalize(light.target - light.position);
    float factor = dot(ray,shot);
    float angle = 0.0f ;
    
    if(light.scale < factor){
        angle = max(0.0f,dot(-ray,normal));
    }else{
        angle = 0.0f;
    }
    return angle * smoothstep(light.scale,1.0f,factor) * color * light.color * light.intensity;
}
vec3 pLightMixtureDiff(vec3 color,vec3 normal,PLight light){
    //todo
    //光的强度距离衰减
    float dis = distance(light.position,oPosition);

    vec3 ray = normalize(light.position - oPosition);
    float angle = max(0.0f,dot(ray,normalize(normal)));
    if(dis > light.energy){
        return vec3(0.0f);
    }else{
        return angle * color * light.color * light.intensity * (1.0f - smoothstep(0.0f,light.energy,dis));
    }
}
`

const SHADOW_UNIFORM = `
uniform float shadowCount;
uniform mat4 shadowProjectionMatrix;
uniform mat4 shadowViewMatrix;
uniform sampler2D shadowMap;

`

const BLUR = `
#include<math>
    vec3 vBlur(vec2 uv,float height,float step){
        float off = 1.0f / height;
        vec3 color = texture(map,uv).rgb;

        for(float i = 1.0f ; i < step ; i += 1.0f){
            // float weight = gaussian(i);
            color += texture(map,uv + vec2(0.0f,off * i)).rgb;
            color += texture(map,uv - vec2(0.0f,off * i)).rgb;
        }
        return color / (2.0f * step + 1.0f);
    }
    vec3 hBlur(vec2 uv,float width,float step){
        float off = 1.0f / width;
        vec3 color = texture(map,uv).rgb * gaussian(0.0f);

        for(float i = 1.0f ; i < step ; i += 1.0f){
            float weight = gaussian(i);
            color += texture(map,uv + vec2(off * i,0.0f)).rgb;
            color += texture(map,uv - vec2(off * i,0.0f)).rgb;
        }
        return color / (2.0f * step + 1.0f);
    }

`

const MATH = `
    //标准正太分布取值
    #define PI 3.1415926
    float gaussian(float x){
        //1.0f / sqrt(2 * PI) * exp(- pow(x,2.0f) / 2);
        return 1.0f / sqrt(2.0f * PI) * exp(- pow(x,2.0f) / 2.0f);
    }
`

export {VERSION,PRECISION,MATRIX,LIGHT,LIGHT_COLOR_MIXTURE,SHADOW_UNIFORM,BLUR,MATH}