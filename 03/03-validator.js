// validator

// 패키지 2개 설치 validator, uuid
//npm install validator uuid
const validator = require("validator");
const {v4: uuidv4} = require("uuid");   //uuid 모듈안에 v4 객체를 uuidv4 이름으로 여기서 사용할 수 있게함

//이메일 검증
const emailStr = "test@example.com";
// const emailStr = "test#example.com";
console.log("이메일 검증", validator.isEmail(emailStr));

// url 검증
const urlStr= "http://www.naver.com"
console.log("URL 검증", validator.isURL(urlStr));
//IP 검증
const ipStr = "127.0.9.1";
console.log("IP 검증", validator.isIP(ipStr));
// 전화번호 검증
const phoneStr = "010-2222-2222";
console.log("전화번호 검증", validator.isMobilePhone(phoneStr));

// UUID 중복이 되면 안되는 값에 사용(특정 유니크한 키값 얻음)
// 호출할때 마다 다른 유니크한 값이 생성됨
const uuid = uuidv4();
console.log("UUID v4", uuid);

// 예시
const user = {
    id:uuidv4(),
    name: "홍길동",
    email: "hong@email.com"
}

console.log(user);