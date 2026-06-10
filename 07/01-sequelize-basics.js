// 07 ORM
// 인스톨 npm i sqlite3,  npm i sequelize

const { Sequelize, DataTypes, Op } = require("sequelize");
const path = require("path");

// sequelize orm 개체 생성
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "basics.db"),
    logging: true   // 로그 보기
});

// 테이블 == 모델
// 모델 orm
const Post = sequelize.define("Post", {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    author: { type: DataTypes.STRING },
});

// 실행
async function main() {
    await sequelize.sync();    // sync({force=false})

    // db 생성 후 추가
    // insert == create
    // insert into Posts(tite, content, author) values(?,?,?)
    await Post.create({ title: "첫번째 글", content: "안녕하세요", author: "김철수" });
    await Post.create({ title: "두번째 글", content: "안녕하세요", author: "이영희" });
    await Post.create({ title: "세번째 글", content: "안녕하세요", author: "최바둑" });
    await Post.create({ title: "네번째 글", content: "반가워요", author: "김민식" });
    await Post.create({ title: "다섯번째 글", content: "좋은하루~", author: "박연호" });

    // 데이타 전부 조회
    const all = await Post.findAll();   // select * from Posts
    console.log(all);
    all.forEach((a) => {
        console.log(a.title, a.content, a.author)
    });

    // 아이디로 하나만 조회
    const first = await Post.findByPk(1);
    console.log(first.title, first.content, first.author);  // select * from Posts where id=1

    // 수정 update(하나 가져와서 수정후 세이브)
    // update Posts set title =? where id =1
    const post = await Post.findByPk(1);
    post.title = "1번 제목 수정";
    // 저장
    post.save();
    console.log("수정된 후 1번 글: ", (await Post.findByPk(1)).title);

    // 삭제 Destory ( delete from posts where id = 2)
    await Post.destroy({ where: { id: 2 } });
    // select count(*) from Posts
    console.log("삭제된 후 전체 글 수 : ", (await Post.count()));

    // bulk insert 여러개 한번에 넣는거
    // insert into posts(title, content, author) values(?,?,?), (?,?,?)
    await Post.bulkCreate([
        { title: "Node.js 입문", content: "Node 연습부터", author: "김철수" },
        { title:"Express.js 입문", content: "Express 연습부터", author: "김기남" },
        { title: "Nest.js 입문", content: "Nest 연습부터", author: "김형의" },
    ]);

    // where 조건
    // select * from Posts where author = "김철수"
    const byAuthor = await Post.findAll({where: {author:"김철수"}});
    console.log(byAuthor);

    // Like 검색 모듈 임포트 추가 Op
    // select * from Posts where title like '%Express%'
     // select title,content from Posts where title like '%Express%'
    const likeTitle = await Post.findAll({
        where:{title: {[Op.like] : "%Express%"}}
    });
    console.log("Op.like", likeTitle.map((p)=> p.title));

    // 필요한 컬럼만 가져오기
    // select id, title from Posts order by id asc
    const titleOnly = await Post.findAll({
        attributes: ["id", "title"],
        order: [["id", "ASC"]]
    });
    console.log("titleOnly : ", titleOnly.map((p)=> p.toJSON()));
    
    //파일 1개만 가져오기
    const one = await Post.findOne({
        where: {author:"이영희"},
        order: [["id", "ASC"]]
    });
    console.log("one: ", one.toJSON());

    // 같은글자 한번에 바꿀때
    // update Posts set author = "이철수" where author = "김철수"
    //  받을 변수 = await Post.update(바꿀꺼, where 조건, );
    const [affected] = await Post.update({author:"이철수"}, {where: {author:"김철수"}});
    console.log(affected);

    // 로우 쿼리 날리는거
    const rawPows = await sequelize.query(
        "select id, title, author from Posts where author = :author",
        {
            replacements : {author: "이철수"},
            type : Sequelize.QueryTypes.SELECT, // select 결과를 배열로...
        }
    );
    console.log("raw sql", rawPows);

    // In
    // select * from Posts where id in(1,3,5) 1,3,5에 해당되는 아이디만 가져옴
    const inIds = await Post.findAll({
        where: {id: {[Op.in]: [1,3,5]}}
    });
    console.log("inIds", inIds.map((p)=> p.toJSON()));

    // and
    const andCond = await Post.findAll({
        where:{
            // 이철수 넣으면 같이 있는 데이타가 없어서 안나옴
            [Op.and]: [{author:"김기남"}, {title: {[Op.like]: "%Express%"}}]
        }
    });
    console.log("andCond", andCond.map((p)=> p.toJSON()));
}

main();