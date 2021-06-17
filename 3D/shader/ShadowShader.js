
const ShadowVertexShader = `#include<version>
#include<precision>

#include<matrix>

layout(location = 0) in vec3 position;

out vec3 oPosition;
         
void main(){
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0f);
    oPosition = gl_Position.xyz / gl_Position.w;
}

`
const ShadowFragmentShader = `#include<version>
#include<precision>

out vec4 FragColor ;
in vec3 oPosition;

void main(){
    gl_FragDepth = gl_FragCoord.z;
    FragColor = vec4(vec3(oPosition.z),1.0f);
}

`


export {ShadowVertexShader,ShadowFragmentShader}