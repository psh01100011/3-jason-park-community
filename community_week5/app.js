const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    credential: 'true' 
}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/pages/index/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/pages/login/login.html');
});

app.get('/regist', (req, res) => {
  res.sendFile(__dirname + '/public/pages/regist/regist.html');
});
app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/public/pages/write/write.html');
});
app.get(`/post/$`, (req, res) => {
  res.sendFile(__dirname + '/public/pages/write/write.html');
});
app.get('/post/:postId', (req, res) => {
  const { postId } = req.params;
  console.log('게시물 ID:', postId);
  res.sendFile(__dirname + '/public/pages/post/post.html');
});

// public 폴더
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

//백엔드 api 관련

//프록시 로그인 처리
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
try {
    const response = await fetch('http://localhost:8080/api/v1/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    if(response.status === 201){
      const userId = await response.text();
      response.headers.forEach((value, name) => {
        if (name.toLowerCase() === 'set-cookie') {
          console.log(name,':', value);
          res.cookie('JSESSIONID', value.split(';')[0].split('=')[1]);
          
          console.log(userId);
          res.cookie('userId', userId);
        }
      });
    
      res.status(200).json({
          message: '로그인 성공',
          success: true
      });
      console.log('auth/login : 로그인 성공');
        
    }
    else{
        res.status(401).json({
            message: '로그인 실패',
            success: false
        });
        console.log('auth/login : 로그인 실패');
    }
  } catch (err) {
    console.error('로그인 프록시 에러:', err);
    res.status(500).json({ message: '로그인 중 오류 발생' });
  }
});


//프록시 내 프로필
app.get('/users/me', async (req, res) => {
    console.log('users/me 호출됨');
    try {
        const cookieHeader = req.headers.cookie || '1';
        console.log('users/me 요청 쿠키:', cookieHeader);

        const response = await fetch('http://localhost:8080/api/v1/users/me', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Cookie': cookieHeader 
          }
        });
        // 백엔드에서 내려온 데이터를 그대로 전달
        const text = await response.text();
        console.log('users/me 응답 상태:', text);
        let body;
        try { body = JSON.parse(text); } catch { body = { message: text }; }

        res.status(response.status).json(body);

    } catch (err) {
        console.error('유저 정보 조회 프록시 에러:', err);
        res.status(500).json({ message: '유저 정보를 불러오는 중 오류 발생' });
    }
});


//프록시 게시물 리스트
app.get('/api/posts', async (req, res) => {
  const { lastPostId, limit } = req.query;
  try {
    const response = await fetch(`http://localhost:8080/api/v1/posts?lastPostId=${lastPostId || ''}&limit=${limit || 5}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('프록시 오류:', err);
    res.status(500).json({ message: '게시물 가져오기 실패' });
  }
});


//프록시 게시물 상세보기
app.get('/api/postDetail/:postId', async (req, res) => {
  console.log("게시물 상세보기 프록시 호출")
  const { postId } = req.params;
  try {
    const response = await fetch(`http://localhost:8080/api/v1/posts/${postId}`);
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error('프록시 오류:', err);
    res.status(500).json({ message: '게시물 가져오기 실패' });
  }
});


app.post('/users/email', async (req, res) => {
  const email= req.body;
  try {
    const response = await fetch('http://localhost:8080/api/v1/users/email',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        email
      ),
    });
    const data = await response.json();
    console.log('프록시 /users/email 응답:', data);
    res.json(data);
  
  } catch (err) {
    console.error('프록시 오류:', err);
    res.status(500).json({ message: '게시물 가져오기 실패' });
  }
});


app.post('/users/nickname', async (req, res) => {
  const nickname= req.body;
  try {
    const response = await fetch('http://localhost:8080/api/v1/users/nickname',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        nickname
      ),
    });
    const data = await response.json();
    console.log('프록시 /users/nickname 응답:', data);
    res.json(data);
  
  } catch (err) {
    console.error('프록시 오류:', err);
    res.status(500).json({ message: '게시물 가져오기 실패' });
  }
});


//프록시 회원가입 처리
app.post('/auth/regist', async (req, res) => {
  const { email, nickname, password } = req.body;
  try {
    const response = await fetch('http://localhost:8080/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        nickname,
        password
      }),
    });
    if(response.status === 201){
      res.status(201).json({
          message: '회원가입 성공',
          success: true
      });
      console.log('auth/regist : 회원가입 성공');
        
    }
    else{
        res.status(400).json({
            message: '회원가입 실패',
            success: false
        });
        console.log('auth/regist : 회원가입 실패');
    }
  } catch (err) {
    console.error('회원가입 프록시 에러:', err);
    res.status(500).json({ message: '회원가입 중 오류 발생' });
  }
});

app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const cookieHeader = req.headers.cookie || '1';
  try {
    const response = await fetch('http://localhost:8080/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader
      },
      body: JSON.stringify({
        title,
        content
      }),
    }); 
    if(response.status === 201){
      res.status(201).json({
          message: '글 작성 성공',
          success: true
      });
      console.log('posts : 글 작성 성공');
        
    }
    else{
        res.status(400).json({
            message: '글 작성 실패',
            success: false
        });
        console.log('posts : 글 작성 실패');
    }
  } catch (err) {
    console.error('글 작성 프록시 에러:', err);
    res.status(500).json({ message: '글 작성 중 오류 발생' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});