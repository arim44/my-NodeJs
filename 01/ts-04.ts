// 클래스

// 클래스 기본
class Animal {
    protected name: string;
    protected age : number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public move(distance:number = 0): void{
        console.log(`이름: ${this.name}, 나이 : ${this.age}`);
    }

    public getInfo() : string{
        return `이름 : ${this.name}, 나이 : ${this.age}`;
    }
};

const ani1 = new Animal("기린", 3);
console.log("ani1의 정보", ani1.getInfo());

// 상속
class Dog extends Animal {
    private breed:string;

    // dog 생성자
    constructor(name:string, age:number, breed:string){
        super(name, age);        // 부모 클래스의 속성 정의
        this.breed = breed;
    }

    public bark(): void{
        console.log("멍멍!!");
    }

    // 재정의
    public getInfo(): string{
        return `${super.getInfo()}, 품종: ${this.breed}`;
    }
}

const golden = new Dog("금둥이", 2, "골든 리트리버");
console.log("dog info", golden.getInfo());
golden.bark();
golden.move(20);

// implements
// 클래스가 특정 인터페이스(Interface)의 구조를 반드시 구현하도록 강제하는 키워드
interface Flyable {
    fly() : void;
}
// Flyable 안의꺼를 무조건 구현해야함
class Bird extends Animal implements Flyable{
    private wingspan : number;

    // 생성자
    constructor(name:string, age: number, wingspan:number){
        // 문제2 생성자 안의 내용을 구현해보세요
        super(name, age);
        this.wingspan = wingspan;
    }

    fly() {
        console.log(`${this.name} is flying with wingspan ${this.wingspan}`);
    }
}

const bird = new Bird("참새", 2, 0.1);
console.log(bird.getInfo());
bird.fly();