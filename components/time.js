// UTC 기준으로 표시
const now = new Date();
const utcYear = now.getUTCFullYear();
const utcMonth = now.getUTCMonth();
const utcDate = now.getUTCDate();

// 또는 특정 시간대로 강제 설정
const koreaTime = new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
console.log("Korea Time:", koreaTime);
const russiaTime = new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"});
console.log("Russia Time:", russiaTime);