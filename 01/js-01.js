// hello world 를 콘솔에 출력해보세요 && 실행

console.log('hello world');

let date = new Date();
const day = date.getDate();
console.log(day);

// 0~6 0:일요일, 1:월요일
// day 를 넣으면 현재 요일 출력(목요일)
switch(day){ 
    case 0:
        console.log('일요일');
        break;
    case 1:
        console.log('월요일');
        break;
    case 2:
        console.log('화요일');
        break;
    case 3:
        console.log('수요일');
        break;
    case 4:
        console.log('목요일');
        break;
    case 5:
        console.log('금요일');
        break;
    case 6:
        console.log('토요일');
        break;
}
