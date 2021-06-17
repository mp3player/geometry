import Compiler from "../compiler.js";
import { VBlurFragmentShader, VBlurVertexShader } from "../shader/BasicShader.js";
import { preCompileShaderCode } from "../shader/ShaderHandler.js";
import PostProcess from "./PostProcess.js";

export default class VBlur extends PostProcess {
    constructor(width=0,height=0,step=11){
        super(width,height);
        this.step = 11;

        this.shaderCode = {
            vertex : VBlurVertexShader,
            fragment : VBlurFragmentShader 
        };
    }
}