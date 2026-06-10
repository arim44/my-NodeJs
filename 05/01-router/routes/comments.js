
const express = require("express");
const router = express.Router();

// 코멘트 데이타
const comments = [
    {
        id : 1,
        postId : 1,
        content : "코멘트 1" 
    },
    {
        id : 2,
        postId : 1,
        content : "코멘트 2" 
    },
];

// 라우터에서 연결
router.get('/', (req, res)=>{
    res.json(comments);
});

module.exports = router;