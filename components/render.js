class 요소 {
  constructor(
    부모클래스,
    클래스명,
    생성할요소,
    색갈,
    넓이,
    높이,
    텍스트,
    속성
  ) {
    const 요소 = document.createElement(생성할요소);
    let 부모;
    if (부모클래스 === "root") {
      부모 = document.getElementById("root");
    } else {
      부모 = document.getElementsByClassName(부모클래스)[0];
    }
    요소.className = 클래스명;
    요소.style.backgroundColor = 색갈;
    요소.style.width = 넓이;
    요소.style.height = 높이;
    요소.textContent = 텍스트;
    // 커스텀 속성 넣기
    for (const key in 속성) {
      if (key === "style") {
        요소.style.cssText += ";" + 속성[key];
      } else {
        요소.setAttribute(key, 속성[key]);
      }
    }
    return 부모.appendChild(요소);
  }
}
const 뿌리 = document.getElementById("root");
