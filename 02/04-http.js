
const http = require("http");   //Common JS

const server = http.createServer((req, res) => {
    // 실제 웹서버 로직을 추가 해주면 됩니다.

    // 200 클라이언트(브라우저) -> 성공 res -> Response 응답
    // content-Type : text, html, json, media, charset 미리 알려주는거 utf-8포멧이야
    res.writeHead(200, {"content-Type": "text/plain; charset=utf-8"});

    // req -> Request 요청
    console.log("요청 URL", req.url);
    console.log("요청 메서드", req.method);
    console.log("요청 헤더", req.headers);
 
    // 끝나면 출력
    res.end("안녕하세요 첫번째 노드 웹서버 입니다.");
});

// 웹서버 띄우기
const PORT = 3000;
server.listen(PORT, ()=> {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중 입니다.`);
});

// http://localhost:3000/ 주소 브라우저에서 실행