// npm i express nodemon

// import
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const app = express();
app.use(express.json());

// db 파일 생성
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "board.db"),
    logging: false
});

// 모델
const Post = sequelize.define("Post", {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    author: { type: DataTypes.STRING }
});

// 라우터 만들기
// 게시글 생성 라우터
app.post("/posts", async (req, res) => {
    // req.body 가져요기
    // const {} = req.body;
    const { title, content, author } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "제목과 본문은 필수입니다." });
    }
    // 서버 내렸다 올렸다 자동으로 해줌
    const post = await Post.create({ title, content, author });
    res.status(201).json(post);

});

// 게시글 목록 가져와서 리턴하기
app.get("/posts", async (req, res) => {
    const posts = await Post.findAll({
        order: [["id", "desc"]]
    });
    res.json(posts);
});

// 게시글 상세 가져와서 리턴하기
app.get("/posts/:id", async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    // 없을수도 있으니
    if (!post) {
        return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
    res.json(post);
})

// 게시글 수정
app.put("/posts/:id", async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
        return res.status(404).json({ message: "게시글을 찾을 수가 없습니다." });
    }

    //데이타 수정
    const { title, content, author } = req.body;
    if (req.body.title !== undefined && req.body.title) post.title = req.body.title;
    if (req.body.content !== undefined && req.body.content) post.content = req.body.content;
    if (req.body.author !== undefined && req.body.author) post.author = req.body.author;

    // 저장
    await post.save();
    res.json(post);
});

// 삭제 delete
app.delete("/posts/:id", async(req, res) => {
    const post = await Post.findByPk(req.params.id);
    if(!post) {
        return res.status(404).json({ message: "게시글을 찾을 수가 없습니다." });
    }

    await post.destroy();
    res.json({message: "삭제됨", post});
});

async function main() {
    // express 띄우기
    await sequelize.sync();
    app.listen(3000, () => console.log("localhost:3000 서버가 실행중 ")) // Express 가동
}

main();