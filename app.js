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
let logindata = [];
let name = [];
let query = [];
// post 요청은 req.body
app.post("/login", (req, res) => {
  data = req.body;
  res.render("login");
});

app.get("/", (req, res) => {
  res.render("join");
});

app.get("/userinfo", (req, res) => {
  res.json(data);
});

app.get("/logininfo", (req, res) => {
  res.json(logindata);
});

// app.get("/loginfninfo", (req, res) => {
//   res.json(name);
// });
// 로그인 정보 (POST 방식으로 받음)
// 여기부터
// app.post("/loginfn", (req, res) => {
//   name = req.body;
//   let email = req.body.email;
//   let password = req.body.password;
//   // 로컬스토리지 데이터를 대신할 임시 로그인 데이터
//   const loginData = JSON.parse(localStorage.getItem("data")) || [];
//   let user = loginData.find(
//     (user) => user.email === email && user.password === password
//   );

//   if (user.length > 0) {
//     // 로그인 성공 시
//     query = email; // query에 이메일 저장
//     res.json({ query });
//   }
// });

// app.get("/loginfninfo", (req, res) => {
//   res.json({ email: query }); // 이메일 값을 JSON 형태로 반환
// });

app.get("/loginfn", (req, res) => {
  res.render("loginfn", { username: req.query });
});

app.get("/idfind", (req, res) => {
  res.render("idfind");
});

app.get("/pwfind", (req, res) => {
  res.render("pwfind");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
