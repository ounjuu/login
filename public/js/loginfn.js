// fetch("/loginfninfo")
//   .then((response) => response.json())
//   .then((data) => {
//     let localdata = JSON.parse(localStorage.getItem("data")) || [];
//     console.log(data, "data????");
//     let sameEmail = localdata.filter((item) => item.email === data.email);
//     console.log(sameEmail, "same????");
//     // 검색 결과가 없을 경우 alert 띄우고 종료
//     if (sameEmail.length > 0) {
//       document.querySelector(
//         ".welcomeText"
//       ).innerHTML = `${sameEmail[0].name}님 환영합니다!`;
//     } else {
//       alert("이메일이 일치하는 사용자가 없습니다.");
//     }
//   })
//   .catch((error) => {
//     console.error("에러 발생!", error);
//   });
