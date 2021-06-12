import Compiler from "../compiler.js";
import { HBlurFragmentShader, HBlurVertexShader } from "../shader/BasicShader.js";
import { preCompileShaderCode } from "../shader/ShaderHandler.js";
import PostProcess from "./PostProcess.js";

export default class HBlur extends PostProcess {
    constructor(width=0,height=0,step=11){
        super(width,height);
        this.step = 11;
    }
    compileProgram(gl){
        this.program = Compiler.compileProgram(gl,preCompileShaderCode(HBlurVertexShader),preCompileShaderCode(HBlurFragmentShader));
    }
}