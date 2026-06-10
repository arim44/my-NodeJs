
const Database = require("better-sqlite3");
const path = require("path");

// sqlite 파일
const db = new Database(path.join(__dirname, "basic.db"));

// IF NOT EXISTS posts = posts 테이블이  없는 경우에만 생성
db.exec(`
    CREATE TABLE IF NOT EXISTS posts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT not null,
        content TEXT not null,
        author TEXT,
        create_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    `);

// console.log("----------- 1. 문자열 조립 방식 쿼리 -----------");
// const title1 = "첫번째 글";
// const content1 = "첫번째 글 내용 안녕하세요 문자열 입니다.";
// const author1 = "김철수";

// const insertSql1=`
//     insert into posts(title, content, author)
//     values('${title1}', '${content1}', '${author1}')
// `;

// console.log(insertSql1);
// // db 안에 추가
// db.exec(insertSql1);

// // 게시글  추가
// const title2 = "두번째 글";
// const content2 = "두번째 글 내용 안녕하세요 문자열 입니다.";
// const author2 = "이연호";

// const insertSql2=`
//     insert into posts(title, content, author)
//     values('${title2}', '${content2}', '${author2}')
// `;

// console.log(insertSql2);
// // db 안에 추가
// db.exec(insertSql2);

// // 셀렉트
// const allSql = "select * from posts";   
// // db 가져오기(배열로)
// const rows = db.prepare(allSql).all();
// console.log("all select", rows);

// // 글 하나만 가져오기
// const searchId = 1;
// const oneSql = `select * from posts where id =${searchId}`;
// const row = db.prepare(oneSql).get();
// console.log("one select", row);

// // 하나 수정
// const newTitle = "제목수정";
// const updateId = 1;
// const updateSql = `update posts set title = '${newTitle}' where id = ${updateId}`;

// //업데이트
// db.exec(updateSql);

console.log("----------- preparedstatement -----------");
// Insert
const insert = db.prepare("insert into posts(title, content, author) values(?,?,?)");
const info = insert.run("첫번째-글", "첫번째 글 컨텐츠", "김철수");

const insert1 = db.prepare("insert into posts(title, content, author) values(?,?,?)");
const info1 = insert.run("두번째-글", "두번째 글 컨텐츠", "김민석");

console.log("방금 넣은 글의 id", info.lastInsertRowid);

console.log("전체글", db.prepare("select * from posts").all());

// Update
// ? 물음표 순서대로 run
db.prepare("update posts set title =? where id=?").run("제목 수정됨1", 1);
console.log("수정후 1번 글", db.prepare("select * from posts where id=?").get(1));

// delete
// delete 문제1: 게시글 1번을 삭제하고, console.log() 전체 게시글을 한번 가지고와 보세요
db.prepare("delete from posts where id=?").run(1);
console.log("삭제 후 전체 게시글", db.prepare("select * from posts").all());