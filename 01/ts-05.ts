
// 모듈 내보내기, 가져오기

export interface User{
    name: string;
    age: number;
}

export class UserService{
    private users : User[] = [];

    addUser(user: User): void{
        this.users.push(user);
    }

    getUsers(): User[] {
        return this.users;
    }
}

import {UserService as US2, User as U2} from './ts-05';

// 사용
const us1 = new US2();                     //유저 서비스 생성
const u1:U2 = { name: "홍길동", age:25}     // 유저1 생성
us1.addUser(u1);                          // 유저서비스1 에 유저1 푸쉬

console.log("users", us1.getUsers());
