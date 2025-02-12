/// fn 로 넘기기
let email = [];
let localdata = JSON.parse(localStorage.getItem("data")) || [];

const emailInput = document.querySelector(".email-input");
const pwInput = document.querySelector(".pw-input");
// 버튼 클릭
document
  .querySelector(".find-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let phone1 = document.querySelector("#phone1");
    let phone2 = document.querySelector("#phone2");
    let phone3 = document.querySelector("#phone3");
    const phoneText = document.querySelector(".phoneText");

    let sameEmail = localdata.filter(
      (item) =>
        item.phone1 === phone1.value &&
        item.phone2 === phone2.value &&
        item.phone3 === phone3.value
    );

    if (sameEmail.length > 0) {
      phoneText.innerText = `찾으시는 이메일은 ${sameEmail[0].email}입니다.`;
    } else {
      alert("일치하는 사용자가 없습니다.");
    }
  });
