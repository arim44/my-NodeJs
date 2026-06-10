
const express = require("express");
const app = express();

// 가져오기
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

// 마들웨어
app.use(express.json());
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.listen(3000, () => {
    console.log('서버연결')
});