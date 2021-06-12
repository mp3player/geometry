import Compiler from "../compiler.js";
import { BloomFragmentShader, BloomVertexShader } from "../shader/BasicShader.js";
import { preCompileShaderCode } from "../shader/ShaderHandler.js";
import PostProcess from "./PostProcess.js";

export default class Bloom extends PostProcess {
    constructor(width=0,height=0){
        super(width,height);
    }
    compileProgram(gl){
        this.program = Compiler.compileProgram(gl,preCompileShaderCode(BloomVertexShader),preCompileShaderCode(BloomFragmentShader));
        
    }
}