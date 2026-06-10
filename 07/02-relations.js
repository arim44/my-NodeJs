
// import
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "relations.db"),
    logging: true
});

// 모델
const User = sequelize.define("User", { name: DataTypes.STRING });
const Post = sequelize.define("Post", { title: DataTypes.STRING, content: DataTypes.TEXT });
const Comment = sequelize.define("Comment", { content: DataTypes.TEXT });

// 관계 설정
User.hasMany(Post);     //user1 : posts n
Post.belongsTo(User);   // post는 user 에 속함 user1 : posts n

Post.hasMany(Comment);
Comment.belongsTo(Post);

async function main() {
    await sequelize.sync();

    // 데이타 넣기
    let post;
    const user1 = await User.create({ name: "김철수" });
    post = await Post.create({ title: "첫 게시글", content: "내용입니다~", UserId: user1.id })

    await Comment.create({ content: "좋은 글입니다", PostId: post.id });
    await Comment.create({ content: "좋은 날씨입니다", PostId: post.id });
    await Comment.create({ content: "점심 맛있게 드세요", PostId: post.id });

    // select
    const result = await Post.findByPk(post.id, {
        include: [User, Comment]    // 모델명
    });
    console.log(result.title, result.User, result.Comment);
    console.log(result.toJSON());
    
    console.log("----------------------");
    // 문제1 모든 게시글을 가지고 오는데 게시글의 작성자와, 댓글을 같이 출력
    const posts = await Post.findAll({
        include: [User, Comment]
    })
    console.log(posts.map((p)=> p.toJSON()));

    // 역으로 조회 1번꺼 다 가져옴
    const user11 = User.findByPk(1, {
        include: [{model: Post}]
    });
    console.log(user11);
}

main();

