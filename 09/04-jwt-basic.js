// JWT : 위, 변조가 되지 않게 막는 용도
// 설치
// npm i jsonwebtoken

const jwt = require('jsonwebtoken');
const secreat = '92#d=nTvC1iN'; // .env 에 숨김

// 토큰생성
// 생성된 토큰 Jwt.io 사이트에서 붙여넣고 확인 가능
const token = jwt.sign({id:1, name:'김철수', lvl:3},secreat,{expiresIn:'1h'});
console.log("토큰 : ", token);

// 뒤에 1 붙여서 토큰 변조 테스트, 페이로드에서 토큰1 넣으면 에러남
const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iuq5gOyyoOyImCIsImx2bCI6MywiaWF0IjoxNzgxMDY4Mjk3LCJleHAiOjE3ODEwNzE4OTd9.aln0z-aXNJ2wnT7hapICnqF5JwVMwf_VbfwgEXeT1uE1";

// 페이로드
const payload = jwt.verify(token, secreat);
console.log('페이로드 : ', payload);

// 에러 안나게 변조된 토큰 예외처리
try{
    jwt.verify(token1, secreat);
} catch(err) {
    console.log('위변조 토큰 거부: ', err.message);
}