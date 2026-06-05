//배열 필터, 맵

const users = [
    { id: 1, name: "홍길동", age: 25, score: 85 },
    { id: 2, name: "김연아", age: 20, score: 92 },
    { id: 3, name: "이영희", age: 30, score: 78 },
    { id: 4, name: "최민수", age: 22, score: 88 },
    { id: 5, name: "하지원", age: 35, score: 95 },
];

//1. filter user 의 나이가 30세 미만 사람들을 출력해보세요 콜백함수
const youngUsers = users.filter((data) => {
        return data.age < 30;
});

console.log("30세 미만인 사람들", youngUsers);

//2. 사용자 이름만 추출 해보세요 배열로
const userNames = users.map((data)=>{
    return data.name;
});
console.log("사용자 이름만 추출", userNames);

console.log('--------------------');

//3. 나이가 25세 미만인 사람들의 이름만 출력해보세요
// const names = users.filter(25세 미만).map(이름);
const userNames2=users.filter((data)=> data.age < 25).map((data)=>{
    return data.name;
});
console.log("나이가 25세 미만인 사람들의 이름은", userNames);

