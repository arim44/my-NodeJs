// npm i dotenv

// import
const express = require('express');
const app = express();
const port = 3002;
const path = require("path");
// .env 가져오기
require("dotenv").config();
// 위와 같은 거임
// const dotenv = require("dotenv");
// dotenv.config();

const secret = process.env.JWT_SECRET;
const saltRound = process.env.SALT_ROUND;

app.listen(port, () => {
    console.log('http://localhost:3002 에서 실행중');
});