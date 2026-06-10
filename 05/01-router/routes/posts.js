
const express = require("express");
const router = express.Router();

const posts = [
    {
        id: 1,
        title : '제목1',
        author : '작가1',
    },
    {
        id: 2,
        title : '제목2',
        author : '작가2',
    },
];

// 앱에서 부를꺼임
// 전체 가져오기
router.get('/',(req, res)=>{
    res.json(posts)
});

// 개별로 가져오기
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((data)=>{
        return data.id === id
    });
    if(!post){
        return res.status(404).json({message:"게시글을 찾을 수 없습니다"});
    }
    res.json(post);
})

module.exports = router;