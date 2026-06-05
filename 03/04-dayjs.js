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