const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/pages/index/index.html');
});


// public 폴더 내의 정적 파일 제공
// js 파일
app.get(/.*\.js$/, (req, res) => {
  res.type('application/javascript');
  res.sendFile(__dirname + req.path);
});

// css 파일
app.get(/.*\.css$/, (req, res) => {
  res.type('text/css');
  res.sendFile(__dirname + req.path);
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});