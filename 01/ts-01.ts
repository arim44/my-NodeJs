// 26.06.11
// 타입스크립트

let isDone : boolean = false;
console.log("boolean", isDone);

let decimal : number = 6;
console.log("number", decimal);

let color : string = "blue";
console.log("string", color);

let list : number[] = [1,2,3];
console.log("number[]", list);

let tuple : [string,number] = ["hello", 3];
console.log("tuple Type", tuple);

// 열거형 타입
enum Color{
    Red, Green, Blue
};

let fColor : Color = Color.Blue;
console.log("Color", fColor);

let notSure : any = 4;
notSure = "string";
console.log(notSure);

// 유니온 타입
let unionType : string | number = "hello";
unionType = 42;
console.log(unionType);
