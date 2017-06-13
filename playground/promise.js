//var somePromise=new Promise((resolve,reject)=>{
//    setTimeout(()=>{
//        resolve('life is full of promises');
//    },5000);
//});
//
//somePromise.then((message)=>console.log(message))
//.catch(err=>console.log(err));

var addValues=(a,b)=>{
    return new Promise((resolve,reject)=>{
        if(typeof a==='number' && typeof b==='number'){
            resolve(a+b);
        }else{
            reject('the arguments must be numbers');
        }
    });
}
var add=(a,b)=>{
    return a+b;
}
addValues(6,7)
    .then((result)=>{
        console.log(result);
        return addValues(10,50);
    })
    .then((resp)=>{
        console.log(`newly added sum up to: ${resp}`);
        return 6*2;
    })
    .then(rs=>{
        console.log(`multi is ${rs}`);
    })
    .catch((err)=>{
        console.log(err);
    })
