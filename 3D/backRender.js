import Compiler from './compiler.js'
import {ShadowVertexShader ,ShadowFragmentShader} from './shader/ShadowShader.js'
import {preCompileShaderCode,getShaderCode} from './shader/ShaderHandler.js'
import {vec3 } from '../math/gl-matrix/index.js'

export default class backRender{
    constructor(w=500,h=500,canvas){
        this.width = w;
        this.height = h;
        this.canvas = canvas;
        this.gl = null;
        this.models = [];
        this.lights = [];
        this.shadowModel = []
        this.clearColor = vec3.clone([0,0,0]);
        this.clearAlpha = 1.0;
        this.shadowProgram = null;
        this.shadow = null;
        this.tbo = null;
        this.background = [];
        this.postProcess = [];
        this.init();

    }
    init(){
        this.canvas.width = this.width;
        this.canvas.height = this.height;  
        this.gl = this.canvas.getContext('webgl2',{antialias:false});
        this.shadowProgram = Compiler.compileProgram(this.gl,preCompileShaderCode(ShadowVertexShader),preCompileShaderCode(ShadowFragmentShader));
        window.gl = this.gl;
    }
    addModel(model){
        this.models.push(model);
    }
    addLight(light){
        this.lights.push(light);
    }
    addPostProcess(post){
        this.postProcess.push(post);
        post.init(this.gl);
        if(post.width == 0 || post.height == 0){
            post.width = this.width;
            post.height = this.height;
        }
    }
    getGL(){
        return this.gl != null ? this.gl : this.canvas.getContext('webgl2');
    }
    getProgram(mesh){
        let material = mesh.material;
        let code = getShaderCode(material);
        let program = Compiler.compileProgram(this.gl,...code);
        material.program = program;
        material.needUpdate = false;

        // console.log(...code);

        return program;
    }
    postVertexData(mesh){
        let gl = this.gl;
        //vao
        let vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        //vbo
        let vBuff = Compiler.i_vec3(gl,0,mesh.geometry.position);
        let uBuff = Compiler.i_vec2(gl,1,mesh.geometry.uv);
        let nBuff = Compiler.i_vec3(gl,2,mesh.geometry.normal);
        let tBuff = Compiler.i_vec3(gl,3,mesh.tangant);
        let bBuff = Compiler.i_vec3(gl,4,mesh.biTangant);
        mesh.needUpdate = false;
        mesh.vertexArrayBuffer = vao;

        return vao;
    }
    postUniformData(material){
        let uniforms = material.uniforms;
        let gl = this.gl;
        let program = material.program;
        let textureIndex = 0;
        for(let i in uniforms){
            let value = material[i];
            let type = uniforms[i].type ;
            if(value == null)
                continue;
            switch(type){
                case 'vec4':{
                    Compiler.u_vec4(gl,program,i,value);
                }break;
                case 'vec3':{
                    Compiler.u_vec3(gl,program,i,value);
                }break;
                case 'vec2':{
                    Compiler.u_vec2(gl,program,i,value);
                }break;
                case 'int':{
                    Compiler.u_integer(gl,program,i,value);
                }break;
                case 'float':{
                    Compiler.u_float(gl,program,i,value);
                }break;
                case 'texture':{
                    if(value.tbo == null){
                        let tbo = Compiler.tbo(gl,value.url);
                        value.tbo = tbo;
                    }
                    gl.activeTexture(gl.TEXTURE0 + textureIndex);
                    gl.bindTexture(gl.TEXTURE_2D,value.tbo);
                    Compiler.u_integer(gl,program,i,textureIndex++);
                }break;
            }
        }
    }
    renderLight(program){
        let gl = this.gl;
        this.lights.forEach(l => {
            switch(l.type){
                case 'ALight' : {
                    Compiler.u_vec3(gl,program,'aLight.color',l.color);
                    Compiler.u_float(gl,program,'aLight.intensity',l.intensity);
                }break;
                case 'DLight':{
                    Compiler.u_vec3(gl,program,'dLight.color',l.color);
                    Compiler.u_float(gl,program,'dLight.intensity',l.intensity);
                    let dir = vec3.create();
                    vec3.subtract(dir,l.target,l.position);
                    Compiler.u_vec3(gl,program,'dLight.direction',dir);
                }break;
                case 'PLight':{
                    Compiler.u_vec3(gl,program,'pLight.color',l.color);
                    Compiler.u_float(gl,program,'pLight.intensity',l.intensity);
                    Compiler.u_float(gl,program,'pLight.energy',l.energy);
                    Compiler.u_vec3(gl,program,'pLight.position',l.position);
                }break;
                case 'SLight' : {
                    Compiler.u_vec3(gl,program,'sLight.color',l.color);
                    Compiler.u_float(gl,program,'sLight.intensity',l.intensity);
                    Compiler.u_vec3(gl,program,'sLight.position',l.position);
                    Compiler.u_vec3(gl,program,'sLight.target',l.target);
                    Compiler.u_float(gl,program,'sLight.scale',Math.cos(l.scale));
                    // console.log(l)
                }break;
            }
        })
    }
    createTexture(material,program){
        let gl = this.gl;
        let index = 0;
        // gl.useProgram(program);
        if(material.map){
            if(!material.map.tbo){
                let t1 = Compiler.tbo(gl,material.map.url);
                material.map.tbo = t1;
            }
            gl.activeTexture(gl.TEXTURE0 + index);
            gl.bindTexture(gl.TEXTURE_2D,material.map.tbo);
            
            Compiler.u_integer(gl,program,'map',index++);
        }
        if(material.normalMap){
            if(!material.normalMap.tbo){
                let t2 = Compiler.tbo(gl,material.normalMap.url);
                material.normalMap.tbo = t2;
            }

            gl.activeTexture(gl.TEXTURE0 + index);
            gl.bindTexture(gl.TEXTURE_2D,material.normalMap.tbo);
            
            Compiler.u_integer(gl,program,'normalMap',index++);
        }
    }
    createBuffer(mesh){

    }
    disposeBuffer(){
        
    }
    generateShadowModel(){
        let framebuffers = [];
        let gl = this.gl;
        let program = this.shadowProgram;
        
        gl.clearColor(0,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        for(let i=0;i<this.lights.length;++i){
            let camera = this.lights[i].shadowCamera;
            if(!camera)
                continue;
            let width = this.lights[i].shadowWidth;
            let height = this.lights[i].shadowHeight;
            
            gl.viewport(0,0,width,height);

            camera.position = this.lights[i].position;
            camera.lookAt = this.lights[i].target;
            
            let fbo = Compiler.fbo(gl,width,height);
            gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
            let o = {camera,fbo};
            framebuffers.push(o);
            camera.update();
            this.shadowModel.forEach(mesh => {
                // console.log(mesh)
                mesh.update();
                //use program
                gl.useProgram(program);
                //matrix
                Compiler.u_mat4(gl,program,'projectionMatrix',camera.projectionMatrix);
                Compiler.u_mat4(gl,program,'viewMatrix',camera.viewMatrix);
                Compiler.u_mat4(gl,program,'modelMatrix',mesh.modelMatrix);

                //vao 
                // if(!mesh.vao){
                let vao = gl.createVertexArray();
                gl.bindVertexArray(vao);
                //vbo
                // console.log
                let vBuff = Compiler.i_vec3(gl,0,mesh.geometry.position);
                //draw
                gl.drawArrays(gl.TRIANGLES,0,mesh.geometry.position.length / 3);
                //dispose vbo
                gl.deleteBuffer(vBuff);
                //dispose vao
                gl.bindVertexArray(null);
                gl.deleteVertexArray(vao);
            })
        }
        // gl.cullFace(gl.BACK);
        return framebuffers;
    }
    poseShadowMap(mesh,shadowMaps){
        let gl = this.gl;
        let program = mesh.material.program;
        if(mesh.material.receiveShadow){
            Compiler.u_float(gl,program,"shadowCount",shadowMaps.length);
            shadowMaps.forEach((d,i) => {
                let eye = d.camera;
                let shadow = d.fbo;

                Compiler.u_mat4(gl,program,`shadowProjectionMatrix`,eye.projectionMatrix);
                Compiler.u_mat4(gl,program,`shadowViewMatrix`,eye.viewMatrix);
                
                gl.activeTexture(gl.TEXTURE10);
                gl.bindTexture(gl.TEXTURE_2D,shadow.texture);
                Compiler.u_integer(gl,program,`shadowMap`,10);
            
            })
        }
    }
    renderModel(camera,shadowMaps){
        let gl = this.gl;
        gl.clearColor(0,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.DEPTH_BUFFER_BIT)
        gl.viewport(0,0,this.width,this.height);
        this.models.forEach(mesh => {
            let program ;
            if(mesh.material.needUpdate)
                program = this.getProgram(mesh);
            else
                program = mesh.material.program;    
            mesh.update();

            //use program
            gl.useProgram(program);

            if(mesh.material.useLight)
                this.renderLight(program);

            //matrix
            Compiler.u_mat4(gl,program,'projectionMatrix',camera.projectionMatrix);
            Compiler.u_mat4(gl,program,'viewMatrix',camera.viewMatrix);
            Compiler.u_mat4(gl,program,'modelMatrix',mesh.modelMatrix);
            Compiler.u_mat3(gl,program,'normalMatrix',mesh.normalMatrix);
            Compiler.u_vec3(gl,program,'cameraPosition',camera.position);

            //material
            this.postUniformData(mesh.material);
            this.poseShadowMap(mesh,shadowMaps);
            
            //vao 
            if(mesh.needUpdate)
                this.postVertexData(mesh);
            gl.bindVertexArray(mesh.vertexArrayBuffer);
            //draw
            gl.drawArrays(gl.TRIANGLES,0,mesh.geometry.position.length / 3);
            //dispose vbo
            gl.bindVertexArray(null);
            gl.bindTexture(gl.TEXTURE_2D,null);
        })
    }
    render(camera){
        let gl = this.gl; 
        
        this.shadowModel = []
        this.models.forEach(d => {
            if(d.material.useShadow)
                this.shadowModel.push(d);
        })
        camera.update();

        //generate the shadow map
        let fbos = this.generateShadowModel();
        //generate the map of the scene
        let screenFrame = Compiler.hdr_fbo(gl,this.width,this.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER,screenFrame);
        this.renderModel(camera,fbos);
        //dispose the framebuffer to release the memory of the graph card to avoid the cash of the browser
        fbos.forEach(d => {
            let fbo = d.fbo;
            Compiler.disposeFboAndTexture(gl,fbo);
        })
        //  apply the post process
        this.applyPostProcess(screenFrame);

        //dispose the original framebuffer
        Compiler.disposeFboAndTexture(gl,screenFrame);
    }
    applyPostProcess(fbo){
        let post = this.postProcess;
        let gl = this.gl;
        let f;
        let originFbo = fbo;
        gl.bindFramebuffer(gl.FRAMEBUFFER,null);
        for(let i = 0 ; i < post.length; ++i){
            let process = post[i];
            if(i < post.length - 1){
                
                f = Compiler.depth_color_fbo(gl,process.width,process.height);
                gl.bindFramebuffer(gl.FRAMEBUFFER,f);
            }
            gl.viewport(0,0,process.width,process.height);
            gl.useProgram(process.program);
            gl.bindVertexArray(process.vertexArrayBuffer);
            //post the last fbo
            gl.activeTexture(gl.TEXTURE0 + i * 2);
            gl.bindTexture(gl.TEXTURE_2D,fbo.texture);
            Compiler.u_integer(gl,process.program,'map',i * 2);
            //post the original fbo
            gl.activeTexture(gl.TEXTURE0 + i * 2 + 1);
            gl.bindTexture(gl.TEXTURE_2D,originFbo.texture);
            Compiler.u_integer(gl,process.program,'map',i * 2 + 1);
            //image size
            this.postUniformData(process);
            gl.drawArrays(gl.TRIANGLES,0,6);
            
            if(fbo){
                gl.bindFramebuffer(gl.FRAMEBUFFER,null);
                Compiler.disposeFboAndTexture(gl,fbo);
            }
            fbo = f;
        }
        if(f){
            gl.bindFramebuffer(gl.FRAMEBUFFER,null);
            Compiler.disposeFboAndTexture(gl,fbo);
        }
    }
}