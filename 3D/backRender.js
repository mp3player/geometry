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
        this.init();
    }
    addModel(model){
        this.models.push(model);
    }
    addLight(light){
        this.lights.push(light);
    }
    init(){
        this.canvas.width = this.width;
        this.canvas.height = this.height;  
        this.gl = this.canvas.getContext('webgl2',{antialias:false});
        this.shadowProgram = Compiler.compileProgram(this.gl,preCompileShaderCode(ShadowVertexShader),preCompileShaderCode(ShadowFragmentShader));
        console.log(this.shadowProgram)
    }
    getGL(){
        return this.gl != null ? this.gl : this.canvas.getContext('webgl2');
    }
    getProgram(material){
        let code = getShaderCode(material);
        let program = Compiler.compileProgram(this.gl,...code);
        return program;
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
    createTexture1(material,program){
        let gl = this.gl;
        // gl.useProgram(program);
        if(material.map){
            if(!material.map.tbo){
                let t1 = Compiler.tbo(gl,material.map.img);
                material.map.tbo = t1;
                if(this.tbo == null)
                    this.tbo = t1;
            }
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D,material.map.tbo);
            
            Compiler.u_integer(gl,program,'map',0);
        }
        if(material.normalMap){
            if(!material.normalMap.tbo){
                let t2 = Compiler.tbo(gl,material.normalMap.img);
                material.normalMap.tbo = t2;
            }

            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D,material.normalMap.tbo);
            
            Compiler.u_integer(gl,program,'normalMap',1);
        }
    }
    createTexture(material,program){
        let gl = this.gl;
        let nMap = material.normalMap;
        let textures = [];
        // let textures = this.createTexture(mesh.material,program);
        if(material.map != null){
            let map = material.map;
            let t1 = Compiler.tbo(gl,map.img);
            gl.bindTexture(gl.TEXTURE_2D,t1);
            gl.activeTexture(gl.TEXTURE0);
            Compiler.u_integer(gl,program,'map',0);
            textures.push(t1);
        }
        if(material.normalMap != null){
            let t2 = Compiler.tbo(gl,nMap.img);
            gl.bindTexture(gl.TEXTURE_2D,t2);
            gl.activeTexture(gl.TEXTURE1);
            Compiler.u_integer(gl,program,'normalMap',1);
            textures.push(t2);
        }
        return textures;

    }
    disposeTexture(tbos){
        let gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D,null);
        tbos.forEach(d => {
            gl.deleteTexture(d);
        })
    }
    createBuffer(mesh){

    }
    disposeBuffer(){
        
    }
    renderModel(camera,shadowMaps){
        let gl = this.gl;
        gl.clearColor(1,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.CULL_FACE);
        gl.viewport(0,0,this.width,this.height);
        this.models.forEach(mesh => {
            let program = this.getProgram(mesh.material);
            
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
            this.createTexture1(mesh.material,program);
            Compiler.u_vec3(gl,program,'color',[1,1,1])
            if(mesh.material.receiveShadow){
                Compiler.u_float(gl,program,"shadowCount",shadowMaps.length);
                shadowMaps.forEach((d,i) => {
                    let eye = d.camera;
                    let shadow = d.fbo;

                    // console.log(eye.viewMatrix)
    
                    Compiler.u_mat4(gl,program,`shadowProjectionMatrix`,eye.projectionMatrix);
                    Compiler.u_mat4(gl,program,`shadowViewMatrix`,eye.viewMatrix);
                    if(this.tbo){
                        gl.activeTexture(gl.TEXTURE10);
                        gl.bindTexture(gl.TEXTURE_2D,shadow.texture);
                        Compiler.u_integer(gl,program,`shadowMap`,10);
                    }
                    // console.log(shadow.texture)
                })
            }
                
            //vao 
            // if(!mesh.vao){
            let vao = gl.createVertexArray();
            gl.bindVertexArray(vao);
            //vbo
            // console.log
            let vBuff = Compiler.i_vec3(gl,0,mesh.geometry.position);
            let uBuff = Compiler.i_vec2(gl,1,mesh.geometry.uv);
            let nBuff = Compiler.i_vec3(gl,2,mesh.geometry.normal);
            let tBuff = Compiler.i_vec3(gl,3,mesh.tangant);
            let bBuff = Compiler.i_vec3(gl,4,mesh.biTangant);
            //draw
            gl.drawArrays(gl.TRIANGLES,0,mesh.geometry.position.length / 3);
            //dispose vbo
            gl.deleteBuffer(vBuff);
            gl.deleteBuffer(uBuff);
            gl.deleteBuffer(nBuff);
            gl.deleteBuffer(tBuff);
            gl.deleteBuffer(bBuff);
            //dispose vao
            gl.bindVertexArray(null);
            gl.deleteVertexArray(vao);
            
            gl.bindTexture(gl.TEXTURE_2D,null);
            this.disposeProgram(program);
        })
    }
    renderShadowModel(){
        let framebuffers = [];
        let gl = this.gl;
        let program = this.shadowProgram;
        
        gl.clearColor(0,1,1,1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // gl.cullFace(gl.FRONT);
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
            gl.bindFramebuffer(gl.FRAMEBUFFER,null);
        }
        // gl.cullFace(gl.BACK);
        return framebuffers;
    }
    disposeProgram(program){
        this.gl.deleteProgram(program);
    }
    render(camera){
        let gl = this.gl; 
        window.gl = gl;
        gl.clearColor(...this.clearColor,this.clearAlpha);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);

        this.shadowModel = []
        this.models.forEach(d => {
            if(d.material.useShadow)
                this.shadowModel.push(d);
        })
        // console.log(this.shadowModel)
        camera.update();
        let fbos = this.renderShadowModel()
        this.renderModel(camera,fbos);
        gl.bindFramebuffer(gl.FRAMEBUFFER,null);
        fbos.forEach(d => {
            let fbo = d.fbo;
            gl.deleteTexture(fbo.texture);
            gl.deleteFramebuffer(fbo);
        })
    }
}