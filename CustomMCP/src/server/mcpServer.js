const WebSocket = require('ws');
const { handleMessage } = require('./messageHandler');
const port = 5000;

const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
  console.log('클라이언트 연결됨');
  ws.on('message', async (message) => {
    console.log('수신된 메시지:', message);
    try {
      const response = await handleMessage(message);
      ws.send(JSON.stringify(response));
    } catch (err) {
      ws.send(JSON.stringify({ error: '처리 중 오류 발생' }));
    }
  });
});

console.log(`MCP 서버가 포트 ${port}에서 실행 중입니다.`);
