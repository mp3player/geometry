const VertexShader = `#version 300 es
precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat3 normalMatrix;

layout(location = 0) in vec3 position;
layout(location = 1) in vec2 uv;
layout(location = 2) in vec3 normal;

void main(){
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0f);
}

`
const FragmentShader = `#version 300 es

precision mediump float;

out vec4 FragColor ;

void main(){
    FragColor = vec4(vec3(1.0f,0.0f,0.0f),1.0f);
}
`


export {VertexShader,FragmentShader}