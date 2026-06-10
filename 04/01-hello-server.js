// 260605 express server

// 모듈
const express = require("express");
const app = express();

// Url, url 요청했을때 호출되는 함수
app.get("/", (req, res) => {
    res.json({message: "Hello Express~~"});
});

//페이지를 여러개 넣고 싶을 때 http://localhost:3000/hello
app.get("/hello", (req, res)=>{
    res.send(`
        <html>
            <head>
                <title>Hello World</title>
            </head>
            <body>
                <h1> Hello Express</h1>
                <p> 첫번째 express 응답 페이지 </p>
            </body>
        </html>`);
})

app.listen(3000, ()=>{
    console.log(`http://localhost:3000 에서 실행중`);
})


