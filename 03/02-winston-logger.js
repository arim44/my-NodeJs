// winston 라이브러리 (로거 출력)
// 패키지 설치
// npm install winston

const winston = require("winston");

// 로거 (보통 catch 안에 넣음)
// const logger = winston.createLogger(설정정보);
const logger = winston.createLogger({
    level: "debug",  // 어느 중요도까지 기록할지 정하는 장소, 배포는 warn, "info" ,개발 debug 까지
    format: winston.format.simple(),    //간단한 테스트 형식
    transports: [                           //파일? 콘솔? 로거에 대한 출력 방향 설정
        new winston.transports.Console(),   // 콘솔로 출력
        new winston.transports.File({       // 파일 app.log 에 출력
            filename:"app.log"
        })
    ]
});

console.log("로깅 시작");

logger.error("에러발생 - 가장 중요한 에러 메시지");
logger.warn("경고발생 - 주의가 필요한 메시지");
logger.info("정보발생 - 일반적인 정보");
logger.debug("디버그발생 - 개발 중에만 사용하는 메시지");

console.log("로깅 끝");

// 타임스탬프가 포함된 로거
const simpleLogger = winston.createLogger({
    level:"info",
    format: winston.format.combine(
        winston.format.timestamp(), // 시간
        // 콜벡함수에 객체 넣음
        winston.format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level}]: ${message}`
        })    //콜백함수
    ),
    transports: [
        new winston.transports.Console(),   // 콘솔로 출력
        new winston.transports.File({       // 파일 app.log 에 출력
            filename:"sample.log"
            //filename:"temp/sample.log"    // 폴더안에 생성
        })
    ]
});

simpleLogger.info("타임스탬프가 포함된 로거");

