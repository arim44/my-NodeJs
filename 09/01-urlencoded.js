// 설치 
// npm i express

// import
const express = require('express');
const app = express();
const port = 3000;

// 바디가 제이슨으로 들어오는걸 넣어줌 (제이슨 요청시)
app.use(express.json());
// urlencoded 제이슨이 중첩되어있을때 할건지 여부 true(url 엔코드로 요청시)
app.use(express.urlencoded({extended:true}));

// 두번째가 콜백함수 
app.post('/posts', (req, res) => {
    console.log('req.body: ', req.body);
    console.log('author: ', req.body.author);
    //res.send(req.body);
    // api 결과를 메타 데이타로 보내고 싶을때, success:true 프론트에서 받아서 처리하기 편하게 넣어줌
    //res.send({success:true, message:'', data:req.body});
    res.send({success:true, resCode:'OK', data:req.body});
});

app.listen(port, () => {
    console.log(`Server start at ${port}`);
});

