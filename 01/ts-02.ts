// 26.06.11
// 인터페이스 : 사용자 정의형 타입

interface User{
    name : string;
    age : number;
}

const user1 :User = {
    name : "이지훈",
    age: 40
}

console.log(user1);

// 문제1 Product 인터페이스 정의
// title 문자열, Price 숫자
// product1 이름으로 객체 정의

interface Product{
    title : string;
    price : number;
}

const product1: Product={
    title : "제품1",
    price : 1000
}
console.log(product1);

// 선택적 프로퍼티 
// color? 넣어도 되고 안넣어도 되는 속성이라고 정의
interface ColorConfig {
    color? : string;
    width? : number;
}
const config1: ColorConfig = {
    color : "red"
}
console.log(config1);

// 문제2 선택적 프로퍼티
// UpdateProfileDt0 인터페이스를 만들고
// 속성은 nickname, phone, maketingAgreed
// 필수값을 nickname, 나머지는 선택적 이다.
// nicknmae : 문자열, phone 문자열, marketingAgreed 불린

interface UpdateProfileDTO {
    nickname : string;
    phone? : string;
    marketingAgreed? : boolean;
}

const profile1 : UpdateProfileDTO = {
    nickname : "닉네임1",
    marketingAgreed : true,
}
console.log(profile1);

// 상속, 확장
interface Admin extends User{
    role : string;
}

const admin1 : Admin = {
    name : "이름1",
    age : 40,
    role:"관리자"
}
console.log(admin1.role);

// 타입
type Student = {
    name : string;
    age : number;
}

// 상태 타입
type Status = "pending" | "paid" | "shipped";

interface Order{
    id: number;
    status : Status;
}

const order1 : Order={
    id:1,
    status:"pending"
}

console.log(order1);

// 문제3 인터페이스 확장
// shape 인터페이스 정의 하고 color 속성(문자열)
// Shape 인터페이스를 확장한 Square 인터페이스 정의
// Square 의 추가 속성 sideLength 숫자 타입으로 정의하고
// 사각형 객체를 하나 만들어 보세요
interface Shape {
    color : string;
}

// 확장 인터페이스
interface Square extends Shape {
    sideLength: number;
}

// 사각형 객체
const square1 : Square = {
    color : "Orange",
    sideLength: 4
}

console.log(square1);