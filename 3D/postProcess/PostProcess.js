import Compiler from "../compiler.js";
import { BufferFragmentShader, BufferVertexShader } from "../shader/BasicShader.js";
import { preCompileShaderCode } from "../shader/ShaderHandler.js";

let position = [-1,-1,1,-1,1,1,-1,-1,1,1,-1,1];
let uv = [0,0,1,0,1,1,0,0,1,1,0,1];

export default class PostProcess{
    constructor(width=0,height=0){
        this.type = 'RenderBuffer';
        this.vertexArrayBuffer = null;
        this.program = null;
        this.width = width;
        this.height = height;
    }
    init(gl=new WebGL2RenderingContext){
        this.postData(gl);
        this.compileProgram(gl);
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
        this.program = Compiler.compileProgram(gl,preCompileShaderCode(BufferVertexShader),preCompileShaderCode(BufferFragmentShader));
    }
    render(){
        //render to the postProcess
        if(!this.program)
            this.init(gl);
        gl.viewport(0,0,width,height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.useProgram(this.program);
        gl.bindVertexArray(this.vertexArrayBuffer);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D,finalFrameBuffer.texture);
        Compiler.u_integer(gl,this.program,'map',0)
        gl.drawArrays(gl.TRIANGLES,0,6);

        gl.deleteTexture(finalFrameBuffer.texture);
        gl.deleteFramebuffer(finalFrameBuffer);
    }

    
}

PostProcess.position = position;
PostProcess.uv = uv;