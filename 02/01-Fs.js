// 내장 모듈

// require 이용해서 파일을 읽고 쓸수 있다
const fs = require("fs");

// // 파일 쓰기
// fs.writeFileSync("test.txt", "hello world");

// //test2.txt 파일을 만들고 "안녕하세요~ 남부여성 발전센터 입니다."
// fs.writeFileSync("test2.txt", "안녕하세요~ 남부여성 발전센터 입니다.");

// //sync 싱크 없는 비동기 방식 콜백함수
// fs.writeFile("async-test.txt", "hello world", (err) => {
//     if (err) {
//         console.log("error", err);
//         return;
//     }
//     console.log("비동기 파일쓰기 완료");
// })

// console.log("비동기 파일쓰기 완료2");

// //3. async-test2.txt파일 만들고, "안녕하세요~ 남부여성 발전센터 입니다."
// // fs.writeFile 메소드로 파일쓰기 연습
// // fs.writeFile(파일이름, 들어갈 데이타, 콜백함수);
// fs.writeFile("async-test2.txt", "안녕하세요~ 남부여성 발전센터 입니다.", (err) => {
//     if (err) {
//         console.log("error", err);
//         return;
//     }
//     console.log("비동기 파일쓰기 완료3");
// });
// console.log("비동기 파일쓰기 완료4");


// console.log('--------------------');

// //파일 읽기
// // fs.readFileSync(파일명, 인코딩 타입);
// const data = fs.readFileSync("test2.txt", "utf-8");
// console.log(data);
// //2. test.txt async-test2.txt async-test.txt 읽어서 콘솔 출력
// const data2 = fs.readFileSync("test.txt", "utf-8");
// console.log(data2);

// const data3 = fs.readFileSync("async-test2.txt", "utf-8");
// console.log(data3);

// const data4 = fs.readFileSync("async-test.txt", "utf-8");
// console.log(data4);


// // 제이슨 파일
// const objData = {
//     name: "김철수", age:25, grade:"A"
// }
// // JSON.stringify() 객체를 string 로 변환
//// fs.writeFileSync("obj-test.json", JSON.stringify(objData));

// const data5 = fs.readFileSync("obj-test.json", "utf-8");
// console.log(data5);
// console.log(typeof data5); // 타입 : string
// // 타입 : string 이면 객체로 못함
// // string 을 자바스크립트 오브젝트(객체)로 변환
// const data6 = JSON.parse(data5);
// console.log(data6);
// // 이름만 출력
// console.log(data6.name);

// 연습문제
let personInfo={
    name: "홍길동",
    age:25,
    address: "서울시 금천구",
    hobby: ["뜨개질", "독서", "커피내리기"]
}
// 1. personInfo 객체를 JSON string 포멧으로 personInfo.json 만들기
fs.writeFileSync("personInfo.json", JSON.stringify(personInfo));

//2. personInfo.json 파일에서 내용을 읽고, 파일내용을 personInfo2 객체에 저장
// const data7 = fs.readFileSync("personInfo.json", "utf-8");
// console.log(data7);

// const personInfo2 = JSON.parse(data7);
// console.log(personInfo2);

// 파스, 읽기 한번에 에러날 위험이 있어 밑에처럼 예외처리
const personInfo3 = JSON.parse(fs.readFileSync("personInfo.json", "utf-8"));

// 파일 읽기, 파스 예외처리 하기
let personInfoStr;
try{
    personInfoStr = fs.readFileSync("personInfo.json", "utf-8");
} catch(e){
    // personInfoStr 문자가 에러나면 빈 내용으로
    personInfoStr="{}";
}
const personInfo22 = JSON.parse(personInfoStr);

//3. personInfo2의 name, age, address, hobby를 콘솔 출력
console.log(personInfo2.name, personInfo2.age, personInfo2.address, personInfo2.hobby);