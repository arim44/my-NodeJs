// path, 디렉토리
const path = require("path");
const fs = require("fs");

//console.log(__dirname, __filename);

// 디렉토리 경로 만들어줌(실제는 안만들어짐)
// 윈도우, 맥 등등 os별로 자동으로 만들어 줌 /, \ 등등)
const sampleDir = path.join(__dirname, "samples", "test.json");
console.log(sampleDir, typeof sampleDir);

// 연습1) 현재 디렉토리 밑에 02/samples/files/token/jwt.json
// path.join을 이용해서 만들기
const tokenDir = path.join(__dirname, "samples", "files", "token", "jwt.json");
console.log(tokenDir);

// 디렉토리 만들기
// 가상경로 생성
const dirName = path.join(__dirname, "parent", "child");
console.log(dirName);


// 디렉토리
//fs.mkdirSync(dirName 만든경로, {recursive: true} 단계별로 생성)
fs.mkdirSync(dirName, { recursive: true });

// 연습문제
// 3. 파일 생성 02/samples/files/token/jwt.json
// 이 파일을 생성하기 여기에 jwtObj 객체를 string 형태로 저장하고
// 객체
const jwtObj = {
    token: "11111", expiredAt: "2026-06-04"
}
// 가상디렉토리 생성
const dirPath = path.join(__dirname, "samples", "files", "token");
console.log(dirPath);
// 디렉토리 생성
fs.mkdirSync(dirPath, { recursive: true });

// 파일 만들기(token폴더안에),  jwtObj 객체를 string 형태로 저장
//fs.writeFileSync(path.join(폴더경로, "파일명"), "utf-8");
fs.writeFileSync(path.join(dirPath,"jwt.json"), JSON.stringify(jwtObj));

// 4. 02/samples/files/token/jwt.json 읽어서 내용을
// jwtobj2로 저장하고, 그 객체의 token 정보를 출력
let personInfoStr;

// pathJoin 경로확인 해봄
// const pathJoin = path.join(dirPath,"jwt.json");
// console.log(pathJoin);

try {
    personInfoStr = fs.readFileSync(path.join(dirPath,"jwt.json"), "utf-8");
} catch (e) {
    personInfoStr = "{}";
}
const token = JSON.parse(personInfoStr);
console.log(token);

// token 출력
console.log(token.token);
