function bubbleSort(arr,key){
    //rank the arr according the key
    let len = arr.length;
    for(let i=0;i<len;++i){
        for(let j=0;j<len - 1;++j){
            if(arr[j][key] > arr[j + 1][key]){
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}

export {bubbleSort}