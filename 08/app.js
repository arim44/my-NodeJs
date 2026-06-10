
const express = require("express");
const {sequelize, Post} = require("./models");
const postRoutes = require("./routes/postRoute");
const {list, create} = require("./controllers/postController");

const app = express();
app.use(express.json());

app.use("/posts", postRoutes);


// // 게시글 조회
// app.get("/posts", list);

// // 게시글 쓰기
// app.post("/posts", create);
// 게시글 상세 수정

// 게시글 삭제


async function main(){
    await sequelize.sync();
    app.listen(3000, ()=> console.log("3000번에서 서버 실행 중"));
}

main();