const { id, name, password } = JSON.parse(localStorage.getItem("user-info"));
localStorage.remove("user-info");
console.log(id, name, password); // 아이디 이름 비밀번호