// npm i dotenv

// import
const { Sequelize, DataTypes } = require("sequelize");

const express = require('express');     // 서버
const app = express();
const port = 3002;
// const path = require("path");

const bcrypt = require('bcryptjs');     // 해싱
const jwt = require('jsonwebtoken');    // 토큰
const { sequelize } = require('../08/models');

// .env 가져오기
require("dotenv").config();
// 위와 아래 같은 거임
// const dotenv = require("dotenv");
// dotenv.config();

const secret = process.env.JWT_SECRET;
const saltRound = Number(process.env.SALT_ROUND);   // saltRound 정수 여야함

// 디비대신 어레인사용 테스트
const users = [];
const posts = [];

// 구분위해 아이디 사용(초기값 에서부터 증가시켜 나감)
let userId = 1;
let postId = 2;

// 미들웨어 뭘로 보낼건지 use 모든 요청에 다 응답함
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// 회원가입 (비번을 해싱해서 디비에 넣음)
app.post('/register', async (req, res)=>{
    // 바디에 있는 내용들을 객체분해로 가져옴
    const {name, email, password} = req.body;
    // null 값 체크
    if(!name || !email || !password) {
        return res.status(400).json({success:false, message: "name, email, password는 필수입니다."});
    }

    // 중복 가입 안되게 체크 users.find 배열이라 이렇게 사용한거임 디비면 시쿼라이즈에맞게 넣음
    if(users.find((u)=> u.email === email)){
        return res.status(409).json({success:false, message: "이미 가입한 이메일 입니다"}); //409 중복오류
    }

    // 비번 해싱(비동기)
    const hash =  await bcrypt.hash(password, saltRound);   // (비밀번호, salt 라운드)
    const user = {id:userId++, name, email, password:hash};     // 아이디 저장후 증가할수 있게

    // 디비면 예외처리 해야함
    // 데이터를 어레이에 넣음
    users.push(user);

    // 응답 생성에 대한 응답 201
    res.status(201).json({success: true, data: {id:user.id, name: user.name, email: user.email}});
});

// 로그인
app.post('/login', async(req, res)=>{
    // 아이디 또는 이메일, 패스워드
    const {email, password} = req.body;
    if(!email || ! password) {
        return res.status(400).json({success:false, message: "email, password는 필수입니다."});
    }
    // db 와 같은지 체크 없으면 없다고 메시지
    const user = users.find((u)=>u.email === email);
    // 유저가 없거나 비번이 잘못되면, 해싱후 일치한지 비교
    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({success:false, message: "email 혹은 password가 올바르지 않습니다."});
    }

    // 토큰발행 페이로드 내용 많이 넣으면 안됨 // 30초 '30m', 3일 '3d'
    const token = jwt.sign({id:user.id, name: user.name}, secret, {expiresIn:'1h'});
    // 응답 토큰 줌
    res.json({success:true, token});
})

// 인증절차하는 미들웨어 만들어서 올림(보통은 따로 만듬)
function auth(req, res, next){
    // 토큰은 리퀘스트에 헤드에 넣음(만약 안보내면 공백으로)
    const header = req.headers.authorization || '';
    // 요청 보내기(포스트맨에서 -> headers -> authorization 값 : Bearer 한칸띄고 토큰 넣음 //Bearer 는 토큰인증이구나 알려주는 용도
    // Bearer 과 토큰 잘라내기 (공백 , 7자 뒤부터 잘라내기)
    const token = header.startsWith('Bearer ')? header.slice(7) : null;
    // 토큰 체크
    if(!token){
        return res.status(401).json({success:false, message: '토큰이 없습니다.'});
    }

    // 우리가 받아야 하는 토큰이 맞는지 체크
    try{
        // 성공하면 req의 유저에 들어감
        req.user = jwt.verify(token, secret);
        next();
    }catch(error){
         return res.status(401).json({success:false, message: '유효하지 않은 토큰입니다.'});
    }
}

//인증 미들웨서 삽입 auth
app.post('/posts',auth, (req, res)=>{
    const { title, content} = req.body;
    if(!title || !content){
        return res.status(400).json({success:false, message: "title, content는 필수입니다."});
    }
    // post 하나 생성해서 posts 배열에 넣기
    const post = {id:postId++, title, content, name : req.user.name};
    posts.push(post);

    // 응답
    res.status(201).json({success:true, post});
})

// // posts 에 내용 생성(인증안됨_누구나 가능 버전), 
// // app.post('/posts', (req, res)=>{
// //     const { title, content} = req.body;
// //     if(!title || !content){
// //         return res.status(400).json({success:false, message: "title, content는 필수입니다."});
// //     }
// //     // post 하나 생성해서 posts 배열에 넣기
// //     const post = {id:postId++, title, content};
// //     posts.push(post);

// //     // 응답
// //     res.status(201).json({success:true, post});
// // })

// const Post = sequelize.define("Post",{
//     title: { type: DataTypes.STRING, allowNull: false },
//     content: { type: DataTypes.TEXT, allowNull: false },
//     // author: { type: DataTypes.STRING }
// });

// // 목록 가져오기
// app.get('/posts', async(req,res)=>{
//     // if(!posts){
//     //     return res.status().json({});
//     // }
//     const posts = await Post.findAll();
//     res.status(201).json({success: true, posts});
// });

// 포스트 다 보이게
app.get('/posts',auth, (req,res) => {
    //const posts = posts;
    res.status(201).json({success: true, posts});
})

// // 아이디로 하나만 보이게
// app.get('/posts/:id', auth, async(req, res)=>{

// })


app.listen(port, () => {
    console.log('http://localhost:3002 에서 실행중');
});