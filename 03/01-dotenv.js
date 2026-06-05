// 외장 모듈 2026.06.05
// 패키지 설치
// npm install dotenv

// dotenv 모듈 
require("dotenv").config();

console.log("서버포트", process.env.PORT);
console.log("DB이름", process.env.DB_NAME);
console.log("API 키", process.env.API_KEY);

// .env 에 키가 NODE_ENV 값이 development 넣고
// process.env.NODE_ENV 를 출력
console.log("노드 환경", process.env.NODE_ENV);

// 개발환경일 경우에는 "개발환경에서 실행중", "운영환경에서 실행중"
if(process.env.NODE_ENV === 'development') {
    console.log("개발환경에서 실행중");
}
else {
    console.log("운영환경에서 실행중");
}