const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios'); // HTTP 요청용

const app = express();
const port = 3000;

// 파일 저장 위치
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  console.log('[업로드 완료]', req.file);

  if (!req.file) {
    return res.status(400).json({ message: '파일 업로드 실패: 파일 없음' });
  }

  const filePath = req.file.path;

  try {
    // 먼저 파일 존재하는지 확인
    if (!fs.existsSync(filePath)) {
      console.error('파일이 존재하지 않음:', filePath);
      return res.status(500).json({ message: '파일이 존재하지 않습니다.' });
    }

    // 파일 내용 읽기 (텍스트 파일만 읽기 가능)
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    console.log('[파일 내용 읽기 완료]');
    console.log(fileContent); // 읽은 내용 로그 찍기

    // Claude Desktop에 질문 보내기
    const rpcRequest = {
      jsonrpc: "2.0",
      id: "1",
      method: "mcp.prompt",
      params: {
        prompt: `다음 파일 내용을 보고 게임 밸런스를 분석해줘:\n\n${fileContent}`
      }
    };

    // Claude Desktop이 MCP 서버 열고 있어야 함 (localhost:5000)
    const response = await axios.post('http://localhost:5000/jsonrpc', rpcRequest, {
      headers: { "Content-Type": "application/json" }
    });

    console.log('[Claude 응답]', response.data);

    res.json({
      message: '파일 업로드 및 Claude 질문 성공!',
      claudeResponse: response.data
    });

  } catch (error) {
    console.error('에러 발생:', error.message);
    res.status(500).json({ message: '파일 읽기 또는 Claude 호출 실패', error: error.message });
  }
});


// 서버 시작
app.listen(port, () => {
  console.log(`Node.js 서버 실행 중: http://localhost:${port}`);
});
