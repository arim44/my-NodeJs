// 26.06.11
// 함수
// : 반환 타입
function add(x: number, y: number): number {
    return x + y;
}

console.log("add", add(3, 4));

// 문제1 multiply 곱하기 함수 x,y,z 각각은 number
// 반환값도 number

function multiply(x: number, y: number, z: number): number {
    return x * y * z;
}
console.log("multiply", multiply(3, 4, 5));

// 선택적 매개 변수
function buildName(firstNmae: string, lastName?:string) : string{
    return lastName? `${firstNmae} ${lastName}` : firstNmae;
}

console.log("build name", buildName('길동'));
console.log("build name", buildName('철수', '김'));

// 기본 매개변수 반환(greeting 에 입력값이 없으면 기본값 반환)
function greet(name:string, greeting: string="안녕하세요"): string{
    return `${greeting} ${name}`;
}

console.log("Greet", greet('홍길동'));
console.log("Greet", greet('홍길동', "반갑습니다"));

//제네릭(타입 보낼수 있음)
function identity<T>(arg:T):T{
    return arg;
}

console.log("number", identity<number>(23));
console.log("string", identity<string>("hello"));

// 아무 타입이나 받고 아무타입이나 반환
function identity2(arg:any) : any {
    return arg;
}

// 특정 제네릭 타입만
function logValue<T extends string | number>(value : T):void {
    console.log(value);
}

logValue("hello");
logValue(22);
//logValue(false);


// 문제2
// buildSearchUrl("이어폰");
// "./products?keyword=이어폰"

function buildSearchUrl (keyword: string, category? : string, minPrice?:number): string{
    // 여기에 로직을 구현 결과는 주석 참조
    let url = `/products?keyword=${keyword}`;
    if(category !== undefined){
        url += `&category=${category}`;
    }
    if(minPrice !== undefined){
        url += `&minPrice=${minPrice}`;
    }

    // // 상항연산자로
    // let url = `/products?keyword=${keyword}` :
    // category? `${url}&category=${category}` : url
    // minPrice? `${url}&minPrice=${minPrice}` : url

    return url;
};
console.log(buildSearchUrl("키워드", undefined,3));
//console.log(buildSearchUrl("키워드",3));