/// fn 로 넘기기
let pw = [];
let localdata = JSON.parse(localStorage.getItem("data")) || [];

// 버튼 클릭
document
  .querySelector(".find-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let emailInput = document.querySelector("#email");
    const emailText = document.querySelector(".emailText");

    let sameEmail = localdata.filter((item) => item.email === emailInput.value);

    if (sameEmail.length > 0) {
      emailText.innerText = `찾으시는 비밀번호는 ${sameEmail[0].pw}입니다.`;
    } else {
      alert("일치하는 사용자가 없습니다.");
    }
  });
