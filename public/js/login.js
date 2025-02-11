fetch("/logininfo")
  .then((response) => response.json()) // 서버에서 JSON 데이터 가져옴
  .then((logindata) => {
    let login_data = JSON.parse(localStorage.getItem("data")) || []; // 기존
    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;
    // email을 기준으로 로그인 데이터 찾기
    let datas = login_data.filter(
      (x) => x.email === emailInput && x.password === passwordInput
    );

    if (datas.length === 0) {
      console.log("로그인 실패: 해당 이메일이나 비밀번호가 올바르지 않습니다.");
      document.querySelector(".loginFail").innerHTML =
        "아이디와 비밀번호를 다시 확인하세요.";
    } else {
      console.log("로그인 성공:", datas);
      // 로그인 성공 시 페이지 이동
      window.location.href = "/loginfn";
    }
    console.log(datas, "??");
  })
  .catch((e) => {
    console.error("에러 발생!", e);
  });
