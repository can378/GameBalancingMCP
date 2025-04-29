const express = require('express');
const bodyParser = require('body-parser');
const readline = require('readline');

const app = express();
const port = 4000;

app.use(bodyParser.json());

// MCP 서버를 따로 터미널에서 띄운다고 가정

// MCP 서버랑 stdin/out 연결
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

app.post('/analyze', (req, res) => {
  const instruction = req.body.instruction;

  if (!instruction) {
    return res.status(400).send({ error: 'instruction 필드가 필요합니다.' });
  }

  console.log(JSON.stringify({ instruction }));

  // MCP는 터미널에 직접 instruction 입력하는 것처럼 동작
  res.send({ result: 'MCP 명령 전송됨 (결과는 MCP 터미널에서 확인)' });
});

app.listen(port, () => {
  console.log(`Proxy 서버 실행중! 포트: ${port}`);
});
