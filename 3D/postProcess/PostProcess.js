import Compiler from "../compiler.js";
import { BufferFragmentShader, BufferVertexShader } from "../shader/BasicShader.js";
import { getShaderCode, preCompileShaderCode } from "../shader/ShaderHandler.js";

let position = [-1,-1,1,-1,1,1,-1,-1,1,1,-1,1];
let uv = [0,0,1,0,1,1,0,0,1,1,0,1];

export default class PostProcess{
    constructor(width=0,height=0){
        this.type = 'RenderBuffer';
        this.vertexArrayBuffer = null;
        this.program = null;
        this.width = width;
        this.height = height;

        this.uniforms = {
            width : { value : this.width , type : 'float' },
            height : { value : this.height , type : 'float' }
        }
        this.defines = {

        }
        
        this.shaderCode = {
            vertex : BufferVertexShader,
            fragment : BufferFragmentShader 
        };

        this.postProcess = [];

        //the texture count of the process
        this.passCount = 1;
    }
    init(gl=new WebGL2RenderingContext){
        this.postData(gl);
        this.compileProgram(gl);
    }
    getFbo(gl){
        return Compiler.depth_color_fbo(gl,this.width,this.height); 
    }
    applyFbos(fbos){

    }
    addPostProcess(){

    }
    postData(gl){
        let vao = gl.createVertexArray();
        this.vertexArrayBuffer = vao;
        gl.bindVertexArray(vao)
        Compiler.i_vec2(gl,0,position);
        Compiler.i_vec2(gl,1,uv);
        gl.bindVertexArray(null);
    }
    compileProgram(gl){
        let code = getShaderCode(this);
        this.program = Compiler.compileProgram(gl,...code);
    }

    
}

PostProcess.position = position;
PostProcess.uv = uv;