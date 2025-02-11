const express = require("express");
const app = express();

const port = 3000;
const path = require("path"); // path 모듈

// body-parser
// x-www-form-urlencoded 방식, 객체 형태로 결과가 나옴
app.use(express.urlencoded({ extended: true }));
// json 형식으로 받을 것임
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// set이 get 위에 와야 함
app.set("view engine", "ejs"); // ejs 파일 html로 변경해줌
app.set("views", "./views"); // ejs 파일 위치 설정
app.set("views", path.join(__dirname, "/views"));

let data = [];

// post 요청은 req.body
app.post("/login", (req, res) => {
  data = req.body;
  res.render("login", { title: `${req.body.name}님 환영합니다.` });
});

app.get("/", (req, res) => {
  res.render("join");
});

app.get("/userinfo", (req, res) => {
  res.json(data);
});

// 서버 띄울때 포트 정보 셋팅 및 처음 실행 시 필요한 기능 수행 가능
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
