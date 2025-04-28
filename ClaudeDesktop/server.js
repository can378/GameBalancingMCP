// server.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// 저장 폴더 설정
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Multer 세팅
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// 파일 업로드 API
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('[업로드 완료]', req.file);

  res.json({
    message: '파일 업로드 성공!',
    filename: req.file.filename,
    path: req.file.path
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`✅ 파일 업로드 서버 실행 중: http://localhost:${port}`);
});
