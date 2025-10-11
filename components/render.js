export class 요소 {
  constructor(
    부모클래스,
    클래스명,
    생성할요소,
    색갈 = 'transparent',
    넓이 = 'auto',
    높이 = 'auto',
    텍스트 = '',
    속성 = {}
  ) {
    // 필수 매개변수 검증
    if (!부모클래스 || !클래스명 || !생성할요소) {
      throw new Error('부모클래스, 클래스명, 생성할요소는 필수입니다.');
    }
    
    // 요소 생성
    const 요소 = document.createElement(생성할요소);
    
    // 부모 요소 찾기 (에러 처리 포함)
    let 부모;
    try {
      if (부모클래스 === "root") {
        부모 = document.getElementById("root");
        if (!부모) {
          throw new Error("root 요소를 찾을 수 없습니다.");
        }
      } else {
        부모 = document.getElementsByClassName(부모클래스)[0];
        if (!부모) {
          console.warn(`부모 클래스 '${부모클래스}'를 찾을 수 없습니다. body를 사용합니다.`);
          부모 = document.body;
        }
      }
    } catch (error) {
      console.error('요소 생성 중 오류:', error);
      부모 = document.body; // 폴백
    }
    
    // 기본 스타일 설정
    요소.className = 클래스명;
    요소.style.backgroundColor = 색갈;
    요소.style.width = 넓이;
    요소.style.height = 높이;
    요소.textContent = 텍스트;
    
    // 커스텀 속성 처리
    for (const key in 속성) {
      try {
        if (key === "style") {
          if (typeof 속성[key] === 'string') {
            요소.style.cssText += ";" + 속성[key];
          } else if (typeof 속성[key] === 'object') {
            Object.assign(요소.style, 속성[key]);
          }
        } else {
          요소.setAttribute(key, 속성[key]);
        }
      } catch (error) {
        console.warn(`속성 '${key}' 설정 중 오류:`, error);
      }
    }
    
    // DOM에 추가하고 요소 반환
    this.element = 부모.appendChild(요소);
    return this.element; // 기존 호환성 유지
  }
}