import Compiler from './compiler.js'
import {VertexShader ,FragmentShader} from './shader.js'


export default class backRender{

    constructor(w=500,h=500,canvas){
        this.width = w;
        this.height = h;
        this.canvas = canvas;
        this.program = null;
        this.gl = null;
        this.models = [];
        this.init();
    }
    add(model){
        this.models.push(model);
    }
    init(){
        this.canvas.width = this.width;
        this.canvas.height = this.height;   
        this.gl = this.canvas.getContext('webgl2');
        this.program = Compiler.compileProgram(this.getGL(),VertexShader,FragmentShader);
        // console.log(this.gl)
    }
    getGL(){
        return this.gl != null ? this.gl : this.canvas.getContext('webgl2');
    }
    render(camera){
            //gl
            let gl = this.gl;   
            // let gl = new WebGL2RenderingContext//this.gl;   
            gl.clearColor(0,0,0,1);
            gl.clear(gl.COLOR_BUFFER_BIT);


            camera.update();
        this.models.forEach(mesh => {
            // mesh.update();
            // console.log(mesh)
            mesh.update();
            // console.log(mesh)
            
            //use program
            gl.useProgram(this.program);
            //camera
            Compiler.u_mat4(gl,this.program,"projectionMatrix",camera.projectionMatrix);
            Compiler.u_mat4(gl,this.program,'viewMatrix',camera.viewMatrix);
            Compiler.u_mat4(gl,this.program,"modelMatrix",mesh.modelMatrix);
            //vao 
            let vao = gl.createVertexArray();
            gl.bindVertexArray(vao);
            //vbo
            // let vbo = gl.createBuffer();
            // gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
            // gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(mesh.position),gl.STATIC_DRAW);
            let vBuff = Compiler.i_vec3(gl,0,mesh.position);
            let uBuff = Compiler.i_vec2(gl,2,mesh.uv);
            let nBuff = Compiler.i_vec3(gl,3,mesh.normal);

            //draw
            gl.drawArrays(gl.TRIANGLES,0,mesh.position.length / 3);
            //dispose vao
            gl.deleteBuffer(vBuff);
            gl.deleteBuffer(uBuff);
            gl.deleteBuffer(nBuff);
            gl.bindVertexArray(null);
            gl.deleteVertexArray(vao);
            //dispose vbo
            // gl.deleteBuffer(vertexBufferObject);
            // gl.deleteBuffer(uvBufferObject);
            // gl.deleteBuffer(normalBufferObject);
            //dispose tbo
        })
    }

    getRender(){
        let gl = this.getGL();
    }

}