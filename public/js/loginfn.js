//fetch 로컬 데이터 가져오기
fetch("/userinfo")
  .then((response) => response.json()) // 서버에서 JSON 데이터 가져옴
  .then((data) => {
    let login_data = JSON.parse(localStorage.getItem("data")) || []; // 기존

    let datas = login_data.filter((x) => x.email === data.email);

    if (datas.length === 0) {
      login_data.push(data);
      localStorage.setItem("data", JSON.stringify(login_data));
    }
  })
  .catch((e) => {
    console.error("에러 발생!", e);
  });
