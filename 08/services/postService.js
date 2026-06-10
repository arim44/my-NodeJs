
const {Post} = require("../models");

// 게시글 목록
const list = () =>{
    return Post.findAll({order: [["id", "desc"]]})
}

// 게시글 쓰기
const create = ({title, content, author}) => {
    return Post.create({title, content, author})
}

// 수정
//const update = 

// 내보내기
module.exports = {list, create}


// app.put("/posts/:id", async (req, res) => {
//     const post = await Post.findByPk(req.params.id);
//     if (!post) {
//         return res.status(404).json({ message: "게시글을 찾을 수가 없습니다." });
//     }

//     //데이타 수정
//     const { title, content, author } = req.body;
//     if (req.body.title !== undefined && req.body.title) post.title = req.body.title;
//     if (req.body.content !== undefined && req.body.content) post.content = req.body.content;
//     if (req.body.author !== undefined && req.body.author) post.author = req.body.author;

//     // 저장
//     await post.save();
//     res.json(post);
// });