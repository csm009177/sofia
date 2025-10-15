import { 요소 } from "../render.js";

export function 캘린더생성(  ) {
  const 현재 = new Date();
  const 현재월인덱스 = 현재.getMonth(); // 0~11

  const 언어모드 = {
    한국어: {
      월명 : ['일월', '이월', '삼월', '사월', '오월', '유월', '칠월', '팔월', '구월', '시월', '십일월', '십이월'],
      요일명 : ['일', '월', '화', '수', '목', '금', '토'],
    },
    영어: {
      월명 : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      요일명 : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    러시아어 : {
      월명 : ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      요일명 : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    }
  }
  

  // 기존 캘린더 제거 (캐싱포함)
  const 기존캘린더 = document.querySelector('.켈린더');
    if (기존캘린더) {
     기존캘린더.remove();
    }

  // 달력 컨테이너 생성
  new 요소('메인', '캘린더', 'div', 'rgba(55, 55, 55, 255)', '70vw', '90vh', '', { 
    style: 'display:block; justify-content:center; align-items:center; position:relative;' 
  });

    // 캘린더 헤더 (월표시 + 네비게이션 + 요일표시)
    new 요소('캘린더', '캘린더헤더', 'div', 'rgba(55, 55, 55, 255)', '70vw', 'auto', '', {
      style: 'display:block;'
    });
      //월표시
      new 요소('캘린더헤더', '월표시란', 'div', 'rgba(55, 55, 55, 55)', '100%', '10vh', `${현재월인덱스 + 1}월`, {
        style : 'display:flex; justify-content:center; align-items:center; font-size:5rem; font-weight:bold;'
      });
      // 요일명표시 컨테이너
      new 요소('캘린더헤더', '요일명표시란', 'div', 'rgba(55, 55, 55, 255)', 'auto', '10vh', '', {
        style : 'display:flex; justify-content:center; align-items:center; font-size:2.5rem; font-weight:bold;'
      });
      // 요일명표시
      const 영문요일명 = 언어모드.영어.요일명;
      for(let i=0; i<영문요일명.length; i++){
          new 요소('요일명표시란', `${언어모드.한국어.요일명[i]}요일`, 'div', 'rgba(55, 55, 55, 255)', '10vw', '100%', 영문요일명[i], {
            style: `display:flex; justify-content:center; align-items:center; color:${(i === 0 || i === 6) ? 'rgba(255, 0, 0, 255)' : 'white'};`
          });
      };
      

    // 캘린더 섹션 (실제 날자 및 스케쥴 표기)
    new 요소('캘린더' ,'캘린더섹션', 'div', 'rgba(55, 55, 55, 255)', '70vw', 'auto', '', {
      style: 'display:block;'
    });
      // 주별 칸 생성
      for(let 주번호=0; 주번호<6; 주번호++){ // 최대 6주
        new 요소('캘린더섹션', `${주번호+1}주`, 'div', 'rgba(55,55,255)', 'auto', 'auto', '', {
          style: 'display:flex; justify-content:center; align-items:center;'
        });
      };
        // 이전달의 마지막 주의 날짜별 컨테이너 생성
        for(let 요일=0; 요일<7; 요일++){ // 7일
          new 요소('1주', `1주${언어모드.한국어.요일명[요일]}요일`, 'div', 'rgba(55, 55, 55, 255)', '10vw', 'auto', '', {
            style: 'display:flex; justify-content:center; align-items:center; background:rgba(65, 65, 65, 255);'
          });

        }



      
}
