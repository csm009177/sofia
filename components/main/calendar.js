import { 요소 } from '../render.js';  // ← 경로 수정 (../../components/render.js → ../render.js)

export function 캘린더생성(){
    // 사용자의 로컬 시간정보 가져오기
    const 현재 = new Date();
    const 현재연도 = 현재.getFullYear();
    const 현재월 = 현재.getMonth(); // 0부터 시작 (0=1월, 1=2월...)
    const 현재일 = 현재.getDate();
    const 현재요일 = 현재.getDay(); // 0=일요일, 1=월요일...
    console.log(현재연도, 현재월, 현재일, 현재요일);
    // 요일명 선언
    const 국문요일명 = ['일', '월', '화', '수', '목', '금', '토'];
    const 영문요일명 = ['sun', 'mon', 'tue', 'wed', 'thr', 'fri', 'sat'];

    // 해당 월의 첫 번째 날과 마지막 날 구하기
    const 해당월의첫째날 = new Date(현재연도, 현재월, 1);
    console.log(`해당월의첫째날: ${해당월의첫째날}`);
    const 해당월의마지막날  = new Date(현재연도, 현재월 + 1, 0);
    console.log(`해당월의마지막날: ${해당월의마지막날}`);
    // 해당 월의 총 일수 구하기
    const 해당월의총일수 = 해당월의마지막날.getDate();
    console.log(`해당월의총일수: ${해당월의총일수}`);
    // 해당 월의 첫 번째 날의 요일 구하기
    const 해당월의첫째날요일 = 해당월의첫째날.getDay(); // 0=일요일, 1=월요일...
    console.log(`해당월의첫째날요일: ${해당월의첫째날요일}`);

    // 이전 달의 마지막 날들도 계산
    const 이전달 = new Date(현재연도, 현재월, 0);
    console.log(`이전달: ${이전달}`);
    const 이전달의총일수 = 이전달.getDate();
    console.log(`이전달의총일수: ${이전달의총일수}`);
    // 이전 달의 마지막주 날들 구하기
    const 이전달의마지막주날들 = 이전달의총일수 - 해당월의첫째날요일 + 1;
    console.log(`이전달의마지막주날들: ${이전달의마지막주날들}`);


    // 달력 컨테이너 생성
    new 요소('메인', '켈린더', 'div', 'rgba(55, 55, 55, 255)', '70vw', '90vh', '', { style: 'display:block; justify-content:center; align-items:center;' });
        // 월별 표시 (현재 월 동적 표시)
        new 요소('켈린더', '월별', 'div', 'rgba(55, 55, 55, 255)', '70vw', '10%', `${현재연도}년 ${현재월 + 1}월`, { style: 'display:flex; justify-content:center; align-items:center;', onclick: 'location.href="/8month"' });
        // 요일 헤더 생성
        new 요소('켈린더', '요일', 'div', 'rgba(55, 55, 55, 255)', 'auto', '15%', '', { style: 'display:flex; justify-content:center; align-items:center;'});

        // 요일들 생성
        국문요일명.forEach((day, index) => {
            const dayStyle = 
            index === 0 ? 'display:flex; justify-content:center; align-items:center; color: #ff6b6b;' 
            : // 일요일은 빨간색
            index === 6 ? 'display:flex; justify-content:center; align-items:center; color: #4dabf7;' 
            : // 토요일은 파란색
            'display:flex; justify-content:center; align-items:center;';

            new 요소('요일', `요일${index}`, 'div', 'rgba(55, 55, 55, 255)', '10vw', '100%', day, { style: dayStyle });
        });
        
        // 캘린더 날짜 생성
        let 날짜카운터 = 1; // 현재 월의 날짜
        let 다음달카운터 = 1; // 다음 달의 날짜
        let 전체카운터 = 0; // 전체 위치 카운터
        
        // 6주 생성 (대부분의 월은 6주 안에 들어감)
        for(let week=0; week<6; week++){
            new 요소('켈린더', `${week+1}주`, 'div', 'rgba(55, 55, 55, 255)', 'auto', '12.5%', '', { 
                style: 'display:flex; justify-content:center; align-items:center;'
            });

            // 각 주의 7일 생성
            for(let day=0; day<7; day++){
                let 표시할날짜 = '';
                let 버튼스타일 = 'display:flex; justify-content:center; align-items:center;';
                
                if (전체카운터 < 해당월의첫째날요일) {
                    // 이전 달의 날짜들 (9월 28, 29, 30)
                    표시할날짜 = 이전달의마지막주날들 + 전체카운터;
                    버튼스타일 = 'display:flex; justify-content:center; align-items:center; filter:blur(1px);';
                } else if (날짜카운터 <= 해당월의총일수) {
                    // 현재 달의 날짜들 (10월 1~31)
                    표시할날짜 = 날짜카운터;
                    날짜카운터++;
                } else {
                    // 다음 달의 날짜들 (11월 1, 2, 3...)
                    표시할날짜 = 다음달카운터;
                    다음달카운터++;
                    버튼스타일 = 'display:flex; justify-content:center; align-items:center; filter:blur(1px);';
                }
                
                new 요소(`${week+1}주`, `day${week}_${day}`, 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', 표시할날짜, { 
                    style: 버튼스타일
                });
                
                전체카운터++;
            }
        }

};