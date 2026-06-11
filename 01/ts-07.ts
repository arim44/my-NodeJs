//어떤 클래스의 동작을 사용하고 싶을떄

// npm i reflect-metadata
import  'reflect-metadata';

// 데코레이더
// 생성자가 생성될때 동작부여
function MarkController(constructor:Function) {
    console.log("등록된 클래스", constructor.name);
}

// 데코레이터더 호출
@MarkController     // MarkController
class ExampleClass {
    constructor(public name : string) {}
}

const example = new ExampleClass("홍길동");
console.log("example name", example.name);

///
// const controllerUrls : 