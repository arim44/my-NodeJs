// 멀티 파트
// 설치 
//  npm i multer morgan nodemon

const express = require("express");
const app = express();
const port = 3002;

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const multer = require("multer");

//const  = require();

try {
    fs.readdirSync('upload');
} catch (e) {
    console.log('upload 폴더 생성');
    fs.mkdirSync('upload');
}

const upload = multer({
    // 스토리지는 어떻게 할꺼고
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'upload/'); // error, '경로/'
        },
        filename(req, file, done) {
            // 확장자
            const ext = path.extname(file.originalname);
            // 파일명
            const baseName = path.basename(file.originalname, ext);
            // 파일명과 확장자를 분리시킨후 날짜를 넣음
            const newName = baseName + Date.now() + ext;
            // 콜백함수
            done(null, newName);
        },
    }),
    // (용량 제한은 어떻게 할꺼임) 파일 받을때 다 받으면 안됨. 리미트 줌
    limits: { fileSize: 1024 * 1024 * 10 }    // 1024(1k) * 1024 여기까지 1메가 * 10 10메가
});

// 파일(이미지) 하나 받는 api
// 키이름 :  image, (req)
app.post('./upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.send({ sucess: true, image: req.file.filename });
});

// 여러파일을 하나의 키로 전송
app.post('/uploadimages', upload.array('images'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.send({ sucess: true, image: req.files });
});

// 여러 파일을 각각의 키로 전송
// path, 미들웨어, upload, 콜백
// 필드정보를 [{}, {}} 어레이로 주고, 각각 넣어야 함
app.post('/uploadfiles', upload.fields([{ name: 'image' }, { name: 'pdf' }]), (req, res) => {
    console.log(req.files);
    console.log(req.body);
    res.send({ success: true, image: req.files.image, pdf: req.files.pdf });
});

// 이미지 보내기(파일 전송)
app.get('/image', (req, res) => {
    // 파일 보내기
    const filename = req.query.filename;
    return res.sendFile(process.cwd() + '/upload/' + filename);
})

app.listen(port, () => {
    console.log(`Server start at ${port}`);
});