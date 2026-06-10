
// 조이 외부모듈 사용
const express = require("express");
const joi = require("joi");

const app = express();

// 미들웨어
app.use(express.json());

// 스키마 정의 벨리데이션: 값 검증
const createPostSchema = joi.object(
    // 검증할 객체
    {
        title : joi.string,

    }
);
