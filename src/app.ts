import { createServer } from './app/server'; // 서버 생성 로직을 불러옴

const PORT = process.env.PORT || 3001;

// 서버 실행
const server = createServer(); // server.ts에 정의된 createServer 함수 사용
server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
