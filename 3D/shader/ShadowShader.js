
import {VERSION,PRECISION,MATRIX,LIGHT,LIGHT_COLOR_MIXTURE} from './ShaderLib.js'


const ShadowVertexShader = `#include<version>
#include<precision>

#include<matrix>

layout(location = 0) in vec3 position;

out vec3 oPosition;
mat4 pm = mat4(0.1,0,0,0,0,0.1,0,0,0,0,-0.020202020202020204,0,0,0,-1.0202020202020203,1);
    mat4 vm = mat4(0.7071067811865477,-0.4082482904638629,0.5773502691896257,0,1.1102230246251568e-16,0.8164965809277263,0.5773502691896258,0,-0.7071067811865474,-0.40824829046386313,0.577350269189626,0,-4.8849813083506896e-15,-2.6645352591003765e-15,-17.320508075688775,1);
                
void main(){
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0f);
    oPosition = gl_Position.xyz;
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