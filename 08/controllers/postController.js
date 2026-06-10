
const postService = require("../services/postService");


const list = async (req, res)=> {
    const result = await postService.list();
    res.json(result);
}

const create = async (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "제목과 본문은 필수입니다." });
    }
    const post = await postService.create({title, content, author});
    res.status(201).json(post);
}

// 게시글 수정
// const update = async(req, res) => {
//     const { title, content, author } = req.body;
//     if() 
// }

module.exports = {list, create};


// app.post("/posts", async (req, res) => {
//     // req.body 가져요기
//     // const {} = req.body;
//     const { title, content, author } = req.body;
//     if (!title || !content) {
//         return res.status(400).json({ message: "제목과 본문은 필수입니다." });
//     }
//     // 서버 내렸다 올렸다 자동으로 해줌
//     const post = await Post.create({ title, content, author });
//     res.status(201).json(post);

// });