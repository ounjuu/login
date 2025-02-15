let emailCheck = false;

//fetch 로컬 데이터 가져오기
fetch("/userinfo")
  .then((response) => response.json()) // 서버에서 JSON 데이터 가져옴
  .then((data) => {
    let login_data = JSON.parse(localStorage.getItem("data")) || []; // 기존

    let datas = login_data.filter((x) => x.email === data.email);

    if (datas.length < 1) {
      login_data.push(data);
      localStorage.setItem("data", JSON.stringify(login_data));
    }
    emailCheckData(login_data);
  })
  .catch((e) => {
    console.error("에러 발생!", e);
  });

function emailCheckData(login_data) {
  const emailInput = document.querySelector(".emailInput");
  const emailBtn = document.querySelector(".emailBtn"); // 버튼 선택
  const emailText = document.querySelector(".emailText");
  // 이메일 정규식
  const strictEmailRegex =
    /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  emailBtn.addEventListener("click", () => {
    // console.log("눌리니???");
    const emailInputText = emailInput.value.trim(); // 입력된 값 가져오기 (앞뒤 공백 제거)
    let sameEmail = login_data.filter((x) => x.email === emailInputText);
    if (sameEmail.length > 0) {
      emailText.innerHTML = "중복입니다. 다른 이메일을 입력해주세요.";
      emailCheck = false;
    } else if (!strictEmailRegex.test(emailInputText)) {
      emailText.innerHTML = "이메일 형식으로 입력하세요.";
      emailCheck = false;
    } else if (emailInputText === "") {
      emailText.innerHTML = "이메일을 입력하세요.";
      emailCheck = false;
    } else {
      emailText.innerHTML = "사용 가능한 이메일입니다.";
      emailCheck = true;
      validCheck();
    }
  });
}

let nameCheck = false;
let pwCheck = false;
let pwReCheck = false;
let genderCheck = false;
let phoneCheck = false;
let ageCheck = false;

// 이름 검사
const nameOninput = () => {
  let namedataup = document.querySelector("#nameInput").value;
  if (namedataup.length < 1) {
    document.querySelector(".nameText").innerText = "이름을 입력하세요.";
    nameCheck = false;
  } else {
    document.querySelector(".nameText").innerText = "";
    nameCheck = true;
  }
  validCheck();
};

// 비밀번호 검사
const pwOninput = () => {
  let pwdataup = document.querySelector("#pwInput").value;
  if (pwdataup.length < 1) {
    document.querySelector(".pwText").innerText = "비밀번호를 입력하세요.";
    pwCheck = false;
  } else {
    document.querySelector(".pwText").innerText = "";
    pwCheck = true;
  }
  validCheck();

  console.log(pwCheck, "??");
};

// 비밀번호 같은지 검사
const pwReOninput = () => {
  let pwdataup = document.querySelector("#pwInput").value;
  let pwredataup = document.querySelector("#pwReInput").value;
  if (pwredataup.length < 1) {
    document.querySelector(".pwReText").innerText = "비밀번호를 입력하세요.";
    pwReCheck = false;
  } else if (pwdataup !== pwredataup) {
    document.querySelector(".pwReText").innerText =
      "위에 입력한 비밀번호와 똑같이 입력해주세요.";
    pwReCheck = false;
  } else if (pwdataup === pwredataup) {
    document.querySelector(".pwReText").innerText = "";
    pwReCheck = true;
  }
  validCheck();
};

// 성별 검사
const genderOnchange = () => {
  genderCheck = true;
  validCheck();
};

// 전화번호 검사

let isValidPhone1 = false,
  isValidPhone2 = false,
  isValidPhone3 = false;

const phone = (x) => {
  let phoneNum1 = document.querySelector(".phoneNum1").value;
  let phoneNum2 = document.querySelector(".phoneNum2").value;
  let phoneNum3 = document.querySelector(".phoneNum3").value;
  const phoneText = document.querySelector(".phoneText");

  if (x === 1) {
    if (/^\d{3}$/.test(phoneNum1)) {
      isValidPhone1 = true;
    } else if (phoneNum1 !== "") {
      phoneText.innerText = "전화번호를 입력해주세요.";
    }
  } else if (x === 2) {
    // phone2 검사: 4자리 숫자
    if (/^\d{4}$/.test(phoneNum2)) {
      isValidPhone2 = true;
    } else if (phoneNum2 !== "") {
      phoneText.innerText = "전화번호를 입력해주세요.";
    }
  } else if (x === 3) {
    // phone3 검사: 4자리 숫자
    if (/^\d{4}$/.test(phoneNum3)) {
      isValidPhone3 = true;
    } else if (phoneNum3 !== "") {
      phoneText.innerText = "전화번호를 입력해주세요.";
    }
  }

  // console.log(isValidPhone1, "isValidPhone1?");
  // console.log(isValidPhone2, "isValidPhone2?");
  // console.log(isValidPhone3, "isValidPhone3?");
  // console.log(phoneCheck, "Dfdf");

  if (isValidPhone1 && isValidPhone2 && isValidPhone3) {
    phoneCheck = true;
    phoneText.innerText = "";
    validCheck();
  } else {
    phoneCheck = false;
  }
  validCheck();
};

// 연도
// 출생년도 생성 (1900년부터 현재까지)
const yearSelect = document.getElementById("birth-year");
const currentYear = new Date().getFullYear(); // 현재 연도

for (let year = 1900; year <= currentYear; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
}

// 월 생성 (1부터 12까지)
const monthSelect = document.getElementById("birth-month");

for (let month = 1; month <= 12; month++) {
  const option = document.createElement("option");
  option.value = month;
  option.textContent = month;
  monthSelect.appendChild(option);
}

// 일 생성 (1부터 31까지)
const daySelect = document.getElementById("birth-day");

for (let day = 1; day <= 31; day++) {
  const option = document.createElement("option");
  option.value = day;
  option.textContent = day;
  daySelect.appendChild(option);
}

// 월과 연도에 따라 일수를 조정하는 함수
const updateDays = () => {
  const selectedYear = parseInt(yearSelect.value);
  const selectedMonth = parseInt(monthSelect.value);

  // 일수를 계산하는 함수
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  // 일 <select>를 비우고 다시 채우기
  daySelect.innerHTML = "<option disabled selected>일</option>";

  for (let day = 1; day <= daysInMonth; day++) {
    const option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    daySelect.appendChild(option);
  }
};

// 연도 또는 월이 선택될 때마다 일수를 업데이트
yearSelect.addEventListener("change", updateDays);
monthSelect.addEventListener("change", updateDays);

// 생년월일 선택 함수
const checkAge = () => {
  const yearSelect = document.getElementById("birth-year");
  const monthSelect = document.getElementById("birth-month");
  const daySelect = document.getElementById("birth-day");

  if (
    yearSelect.value !== "출생년도" &&
    monthSelect.value !== "월" &&
    daySelect.value !== "일"
  ) {
    ageCheck = true;
  } else {
    ageCheck = false;
  }
  validCheck();
};

// 유효성 검사
let signbtn = document.querySelector("#sign");

function validCheck() {
  if (
    emailCheck === true &&
    genderCheck === true &&
    nameCheck === true &&
    pwCheck === true &&
    pwReCheck === true &&
    phoneCheck === true &&
    ageCheck === true
  ) {
    signbtn.disabled = false;
  } else {
    signbtn.disabled = true;
  }
}

const signbtnClick = () => {
  const emailInputvalue = document.querySelector(".emailInput").value;
  const namedataupvalue = document.querySelector("#nameInput").value;
  const pwdataupvalue = document.querySelector("#pwInput").value;
  const phoneNum1value = document.querySelector(".phoneNum1").value;
  const phoneNum2value = document.querySelector(".phoneNum2").value;
  const phoneNum3value = document.querySelector(".phoneNum3").value;
  const yearSelectvalue = document.getElementById("birth-year").value;
  const monthSelectvalue = document.getElementById("birth-month").value;
  const daySelectvalue = document.getElementById("birth-day").value;
  const selectedValue = document.querySelector(
    'input[name="gender"]:checked'
  ).value;

  let inputData = {
    email: emailInputvalue,
    name: namedataupvalue,
    pw: pwdataupvalue,
    gender: selectedValue,
    phone1: phoneNum1value,
    phone2: phoneNum2value,
    phone3: phoneNum3value,
    year: yearSelectvalue,
    month: monthSelectvalue,
    day: daySelectvalue,
  };

  let login_data2 = JSON.parse(localStorage.getItem("data")) || []; // 기존

  let datas2 = login_data2.filter((x) => x.email === inputData.email);

  if (datas2.length < 1) {
    login_data2.push(inputData);
    localStorage.setItem("data", JSON.stringify(login_data2));
  }
};
