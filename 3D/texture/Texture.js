export default class Texture {
    constructor(url){
        this.url = url;
        this.width = 0;
        this.height = 0;
        this.img = new Image();
        this.img.src = this.url;
    }
    static load(src){
        return new Texture(src);
    }
}