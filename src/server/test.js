const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const cors = require('cors');

const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const noticeRouter = require('./routes/notice');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db_config = require('./db');

let connection = mysql.createConnection(db_config);

function handleDisconnect() {
  connection = mysql.createConnection(db_config);


  connection.connect(function (err) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);

    }
  })
  connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  })

}

handleDisconnect();

app.use('/insert/notice', (req, res) => {
  console.log("게시글 db에 저장");
  let img = req.body['img'];
  let attachment = req.body['attachment'];
  let title = req.body['title'];
  let content = req.body['content'];
  let writer = req.body['writer'];
  let time = req.body['time'];
  connection.query('insert into notice values(?,?,?,?,?,?,?,?)', ['', '', '', title, content, writer, time, 1], function (err, rows, fields) {
    res.redirect('/notice'); // or 상세페이지
  })
})

app.use('/update/notice', (req, res) => {
  console.log("게시글 수정 완료");
  connection.query('update')
})

app.use('delete/notice', (req, res) => {
  console.log('게시글 삭제 완료');

})

app.use('/activity', (req, res) => {
  let sql = 'SELECT * FROM activity';

  connection.query(sql, function (err, result) {
    res.json({ new: result });
  });
})

router.get('/login', function (req, res, next) {
  res.render(longin);
})

//router.post()
app.use('/login', function (req, res, next) {
  let userId = req.body['id'];
  let userPw = req.body['pass'];
  console.log(req.body)
  connection.query('select id,college,department,student_number,authority from member where id=\'' + userId + '\' and password=\'' + userPw + '\'', function (err, rows, fields) {
    if (!err) {
      if (rows[0] != undefined) {
        res.json({ user: rows });
      } else {
        res.send('no data');
      }

    } else {
      res.send('error : ' + err);
    }
  });
});

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/notice', noticeRouter);

router.get('/', function (req, res, next) {
  res.render('password-change');
})

app.use('/update', function (req, res, next) {
  let index = 3;
  let userId = "test1";
  let userPw = "test1";
  let userPwNew = "test123"
  let userPwRe = "test1";
  let college = "test1";
  let department = "test1";
  let student_number = "123456789";
  let phone = "010-0000-1111";
  let authority = 0;

  connection.query('select * from member where id=? and password=?', [userId, userPw], function (err, rows, fields) {
    if (!err) {
      console.log("select success");
      if (rows[0] != undefined) {
        connection.query('update member set password=? where id=?', [userPwNew, userId], function (err, rows, fields) {
          if (!err) {
            res.send("password change success");
          } else {
            res.send('error:' + err);
          }
        })
      } else {
        res.send('no data');
      }
    } else {
      res.send("error: " + err);
    }
  })
})

app.get('/home', function (req, res) {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('server connected!')
})