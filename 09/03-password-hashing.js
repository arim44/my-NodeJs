// npm i bcryptjs

const bcrypt = require('bcryptjs');

async function main() {
    const password = 'my-secret-1234';
    const hash = await bcrypt.hash(password, 10);   // (비밀번호, salt 라운드)
    console.log('평문', password);
    console.log('해시', hash);  // db 에는 hash 저장

    // 컴페어
    console.log('올바른 비밀번호: ', await bcrypt.compare('my-secret-1234', hash));  //불형 프라미스 반환
    console.log('틀린 비밀번호: ', await bcrypt.compare('my-secret-1235', hash));  //불형 프라미스 반환
    // => true 면 인증 해주면 됨
}

main();

//   salt 라운드, 22자리 자동으로 붙여주는 salt , .이후 해시값
// $2b $10 $u.anBlQkEWF9owdF2/C1r.BuaX3e4IWh54if3BR9qGo.CLOm0xc0i