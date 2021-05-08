import { Color } from "../shape/image/image.js";
import Circle from "../shape/polygon/circle.js";
import Line from "../shape/path/line.js";
import Vector from "./vector.js";
import Stack from '../collection/stack.js'


export default class Convex {
    static getConvex(arr){

        //find the cornor of the set of the points;
        let dir = {left:arr[0],top:arr[0],right:arr[0],bottom:arr[0]}
        for(let i=0;i<arr.length;++i){
            let v = arr[i];
            if(v.x < dir.left.x) dir.left = v;
            if(v.x > dir.right.x) dir.right = v;
            if(v.y < dir.bottom.y) dir.bottom = v;
            if(v.y > dir.top.y) dir.top = v;
        }


        //get the angle between the horizental line of the bottom with the point from bottom to 
        let e1 = new Vector(1,0);
        let angleArr = []
        let insert = (obj) => {
            if(angleArr.length <= 0){
                angleArr.push(obj);
                return ;
            }
            let i = 0;
            while(i < angleArr.length){
                if(obj.cos > angleArr[i].cos)
                    break;
                ++i;
            }
            angleArr.splice(i,0,obj);
        }

        //rank the data of the point according to the angle
        for(let i=0;i<arr.length;++i){
            let v = arr[i].sub(dir.bottom).normalize();
            let cos = e1.dot(v);
            
            if(!isNaN(cos)){
                insert({cos,vec:arr[i]})
            }
        }
    
        //apply the algorithm for get the convex of the set of of the points

        let stack = new Stack();
        stack.push(dir.bottom);
        stack.push(angleArr[0].vec); 
        angleArr.shift();

        let cross = (v1,v2) => {
            return v1.x * v2.y - v2.x * v1.y;
        }

        // check if the point should be push into the stack 
        let push = (stack,vec) => {
            let p0 = stack.top();
            let p1 = stack.top();
            let v = p0.sub(p1);
            let v1 = vec.sub(p0)
            let z = cross(v,v1);
            if(z > 0){
                stack.push(p1)
                stack.push(p0)
                stack.push(vec);
            }else{
                stack.push(p1)
                push(stack,vec);
            }
        }

        //check all of the points
        for(let i=0;i<angleArr.length;++i){
            push(stack,angleArr[i].vec);
        }
        
        return stack.data;
    }
}


//the animation of the process for the convex 
  
export function convex(painter,arr){
    function cross(v1,v2){
        return v1.x * v2.y - v2.x * v1.y;
    }
    //convex algorithm
    // the first : find the point of the corner
    let dir = {left:arr[0],top:arr[0],right:arr[0],bottom:arr[0]}
    for(let i=0;i<arr.length;++i){
        let v = arr[i];
        if(v.x < dir.left.x){
            dir.left = v;
        }
        if(v.x > dir.right.x){
            dir.right = v;
        }
        if(v.y < dir.bottom.y){
            dir.bottom = v;
        }
        if(v.y > dir.top.y){
            dir.top = v;
        }
    }
    let left = new Circle(dir.left.x,dir.left.y,.5,{
        background:Color.BLACK7
    })
    let top = new Circle(dir.top.x,dir.top.y,.5,{
        background:Color.RED7
    })
    let right = new Circle(dir.right.x,dir.right.y,.5,{
        background:Color.PURPLE
    })
    let bottom = new Circle(dir.bottom.x,dir.bottom.y,.5,{
        background:Color.ORANGE
    })
    
    painter.add(left)
    painter.add(top)
    painter.add(right)
    painter.add(bottom)

    let k = 0;

    let e1 = new Vector(1,0);
    let angleArr = []
    for(let i=0;i<arr.length;++i){
        let v = arr[i].sub(dir.bottom).normalize();
        let cos = e1.dot(v);
        
        if(!isNaN(cos)){
            insert({cos,vec:arr[i]})
        } else{
        }
    }
    console.log(angleArr)

    function insert(obj){
        if(angleArr.length <= 0){
            angleArr.push(obj);
            return ;
        }
        let i = 0;
        while(i < angleArr.length){
            if(obj.cos > angleArr[i].cos)
                break;
            ++i;
        }
        angleArr.splice(i,0,obj);
    }

    
    //apply the algorithm for get the convex of the set of of the points

    let stack = new Stack();
    stack.push(dir.bottom);
    stack.push(angleArr[0].vec); 
    angleArr.shift();


    let line = new Line([],{
        borderWidth:2,
        borderColor:Color.RED
    })
    painter.add(line)

    let push = (stack,vec) => {
        let p0 = stack.top();
        let p1 = stack.top();
        let v = p0.sub(p1);
        let v1 = vec.sub(p0)
        let z = cross(v,v1);
        if(z > 0){
            stack.push(p1)
            stack.push(p0)
            stack.push(vec);
            line.points = []
            stack.forEach(d => {
                line.points.push(d)
            })
            
        }else{
            stack.push(p1)
            push(stack,vec);
        }
    }

    let i = 0;
    let timer = setInterval(() => {
        if(i < angleArr.length){
            push(stack,angleArr[i].vec);
            ++i;
        }else{
            clearInterval(timer);
            line.points.push(dir.bottom)
        }
        painter.render()
    },100)

}



