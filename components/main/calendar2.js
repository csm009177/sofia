import { 요소 } from "../render.js";

export function 캘린더생성() {
  const 현재 = new Date();
  const 현재연도 = 현재.getFullYear();
  const 현재월 = 현재.getMonth(); // 0부터 시작 (0=1월, 1=2월...)
  const 현재일 = 현재.getDate();
  const 현재요일 = 현재.getDay(); // 0=일요일, 1=월요일...
  console.log(현재연도, 현재월, 현재일, 현재요일);

  // 달력 컨테이너 생성
    
}
