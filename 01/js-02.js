//array

let arr=[5,23,"hello",true,"world",-9];

//1.for 또는 while 로 출력 console.log()
for(let i=0; i <= arr.length; i++){
    console.log(arr[i]);
}

let i=0;
while(i < arr.length) {
    console.log(arr[i]);
    i++;
}

console.log('--------------------');
//2. forEach 함수 이용해서 출력 해보세요 console.log()

arr.forEach(function(result){
    console.log(result);
});

console.log('--------------------');
arr.forEach((result)=>{
    console.log(result);
})

console.log('--------------------');
//3. filter arr 에서 문자만 출력 typeof 
arr.filter((aa)=>{
    const result = typeof aa == 'string';
    if(result)
        console.log(result, aa); 
});
