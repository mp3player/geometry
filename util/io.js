async function readFile(fileName,type = 'text'){
    let content = null;
    await fetch(fileName )
        .then(d => {
            switch(type){
                case 'json':return d.json();
                case 'buff':return d.arrayBuffer();
                default : return d.text();
            }
        })
        .then(d => {
            content = d;
        })
    return content;
}

function read(fileName,type = 'text',cb){
    fetch(fileName )
        .then(d => {
            switch(type){
                case 'json':return d.json();
                case 'buff':return d.arrayBuffer();
                default : return d.text();
            }
        })
        .then(d => {
            cb(d)
        })
}

function readImage(fileName){
    let img = null;
    img = new Image();
    let width = 0,height = 0;
    img.onload = function(){
        width = this.width;
        height = this.height;
        console.log(img)
    }
    img.src = fileName
    return img;
}

function writeFile(content,fileName){
    let blob = new Blob([content.toString()]);
    let a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.click();
} 

const IO = {
    readFile,
    read,
    readImage,
    writeFile
}

export {readFile,readImage,writeFile,read}
export default IO