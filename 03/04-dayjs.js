// 260605 날짜 포맷

// 패키지 설치
// npm install dayjs

// Import
const dayjs = require("dayjs");
require("dayjs/locale/ko");
const utc = require("dayjs/plugin/utc");
const relativeTimePlugin = require("dayjs/plugin/relativeTime");    // 상대경로

dayjs.extend(utc);
dayjs.extend(relativeTimePlugin);
dayjs.locale("ko");

// 현재시간
const nowDayjs = dayjs();
console.log(nowDayjs);
// 포맷팅 변경 YYYY-MM-DD(년-월-일) HH:mm:ss(시:분:초)
console.log(nowDayjs.format("YYYY-MM-DD HH:mm:ss"));
// 우리나라 포맷
console.log(nowDayjs.format("YYYY년 MM월 DD일"));

// 특정날짜
const dateDayjs = dayjs("2026-08-07");
console.log(dateDayjs.format("YYYY-MM-DD HH:mm:ss"));

// 문제3 : 2026년 5월 6일 14시 40분 55초
const dtDayjs = dayjs("2026-05-06 14:40:55");
console.log(dtDayjs.format("YYYY년 MM월 DD일 HH시 mm분 ss초"));

// 날짜 계산
// 시간 더하기 빼기 day
const nextWeekDayjs = dayjs().add(7, "day");
console.log(nextWeekDayjs.format("YYYY년 MM월 DD일 HH시 mm분 ss초"));

// 시간 더하기 빼기 week
const nextWeekDayjs2 = dayjs().add(7, "week");
console.log(nextWeekDayjs2.format("YYYY년 MM월 DD일 HH시 mm분 ss초"));

// 시간 더하기 빼기 month
const nextMonthDayjs = dayjs().add(7, "month");
console.log(nextMonthDayjs.format("YYYY년 MM월 DD일 HH시 mm분 ss초"));

// 특정 날짜까지 남은 일수 계산
const startDt = dayjs("2026-04-01");
const endDt = dayjs("2026-10-23");
const diffDt = endDt.diff(startDt, "day");
console.log(`날짜 차이 ${startDt.format("YYYY년 MM월 DD일")} 에서 ${endDt.format("YYYY년 MM월 DD일")} 는 ${diffDt}일`);

// week
const diffWeekDt = endDt.diff(startDt, "week");
console.log(`날짜 차이 ${startDt.format("YYYY년 MM월 DD일")} 에서 ${endDt.format("YYYY년 MM월 DD일")} 는 ${diffWeekDt}주`);

// month
const diffMonthDt = endDt.diff(startDt, "month");
console.log(`날짜 차이 ${startDt.format("YYYY년 MM월 DD일")} 에서 ${endDt.format("YYYY년 MM월 DD일")} 는 ${diffMonthDt}개월`);

// 요일확인
console.log(`오늘은 ${dayjs().format("dddd")} 입니다.`);

// 날짜 범위 생성
const start = dayjs("2026-01-01");
const end = dayjs("2026-12-31");

const range = [];
for(
    let date = start;   // 초기조건 1월1일부터
    date.isBefore(end) || date.isSame(end, "day");  // 끝날보다 전 또는 끝나는날과 같음
    date = date.add(1, "day")   // 증감 1씩
){
    range.push(date.format("YYYY년 MM월 DD일"))
}
console.log(range);