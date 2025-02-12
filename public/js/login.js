let emailCheck = false;
let pwCheck = false;
let iddata;
let pwdata;

fetch("/logininfo")
  .then((response) => response.json()) // 서버에서 JSON 데이터 가져옴
  .then((logindata) => {
    let login_data = JSON.parse(localStorage.getItem("data")) || []; // 기존
    console.log(login_data);

    // 이메일 입력 시 유효성 검사
    const loginidoninput = () => {
      const emailInput = document.getElementById("email").value;
      iddata = login_data.filter((x) => x.email === emailInput);
      console.log(iddata, "id");

      if (emailInput.length < 1) {
        document.querySelector(".emailText").innerHTML =
          "이메일을 입력해주세요.";
      } else if (iddata.length > 0) {
        emailCheck = true;
      } else {
        emailCheck = false;
      }
    };

    // 비밀번호 입력 시 유효성 검사
    const loginpwoninput = () => {
      const passwordInput = document.getElementById("password").value;
      // 비밀번호는 해당 이메일에 맞는 데이터를 필터링하여 확인
      if (passwordInput.length > 0) {
        pwdata = login_data.filter((x) => x.pw === passwordInput);
      } else {
        pwdata = []; // 이메일에 맞는 데이터가 없으면 비밀번호를 확인할 필요가 없음
      }
      console.log(pwdata, "pw");

      if (passwordInput.length < 1) {
        document.querySelector(".pwText").innerHTML =
          "비밀번호를 입력해주세요.";
      } else if (pwdata.length > 0) {
        pwCheck = true;
      } else {
        pwCheck = false;
      }
    };

    // 이메일과 비밀번호 입력 필드에 이벤트 리스너 추가
    document.getElementById("email").addEventListener("input", loginidoninput);
    document
      .getElementById("password")
      .addEventListener("input", loginpwoninput);
  })
  .catch((e) => {
    console.error("에러 발생!", e);
  });

// 유효성 검사 및 로그인 체크
let loginBtn = document.querySelector(".login-button");
const loginFail = document.querySelector(".loginFail");

loginBtn.addEventListener("click", (event) => {
  event.preventDefault(); // 기본 폼 제출 동작 막기

  // 이메일과 비밀번호 확인
  if (!emailCheck || !pwCheck) {
    loginFail.innerHTML = "이메일과 비밀번호를 확인하세요.";
    return;
  }

  // 이메일과 비밀번호가 로컬스토리지와 일치하는 경우
  if (iddata.length > 0 && pwdata.length > 0) {
    if (iddata[0].pw === pwdata[0].pw) {
      window.location.href = "/loginfn"; // 로그인 성공 페이지로 리디렉션
    } else {
      loginFail.innerHTML = "비밀번호가 일치하지 않습니다.";
    }
  } else {
    loginFail.innerHTML = "이메일 또는 비밀번호가 일치하지 않습니다.";
  }
});

/// fn 로 넘기기
let email = [];
let localdata = JSON.parse(localStorage.getItem("data")) || [];

const emailInput = document.querySelector(".email-input");
const pwInput = document.querySelector(".pw-input");
// 버튼 클릭
document
  .querySelector(".login-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let emailInput = document.querySelector(".email-input");
    let pwInput = document.querySelector(".pw-input");
    let sameEmail = localdata.filter((item) => item.email === emailInput.value);

    if (sameEmail.length > 0) {
      window.location.href = `/loginfn?name=${sameEmail[0].name}`;
    } else {
      alert("이메일이 일치하는 사용자가 없습니다.");
    }
  });
