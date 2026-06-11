// 유틸리티

interface User{
    name:string;
    age: number;
    email? : string;
}

const user11 : User = {
    name: "김기남", age:12
}

// 인터페이스 속성을 전부 선택적으로 바꿔줍니다.
type partialUser = Partial<User>;

// 선택적으로 바뀌어서 아무것도 입력안해도 됨
const puser1 : partialUser = {
}

// 인터페이스 속성을 전부 필수로 바꿔줍니다.
type RequiredUser = Required<User>;

// 필수로 바뀌어서 전부 입력해야함
const ruser1: RequiredUser = {
    name:"", age:0, email:""
}

// 인터페이스 모든 필드를 읽기전용
type ReadOnlyUser = Readonly<User>;