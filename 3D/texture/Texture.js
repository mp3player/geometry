export default class Texture {
    constructor(url){
        this.url = url;
        this.width = 0;
        this.height = 0;
    }
    static load(src){
        return new Texture(src);
    }
}