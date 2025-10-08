import { 요소 } from '../render.js';  // ← 경로 수정 (../../components/render.js → ../render.js)

export function 캘린더생성(){
    // 사용자의 로컬 시간정보 가져오기
    const 현재 = new Date();
    const 현재연도 = 현재.getFullYear();
    const 현재월 = 현재.getMonth(); // 0부터 시작 (0=1월, 1=2월...)
    const 현재일 = 현재.getDate();
    const 현재요일 = 현재.getDay(); // 0=일요일, 1=월요일...
    const 국문요일명 = ['일', '월', '화', '수', '목', '금', '토'];
    const 영문요일명 = ['sun', 'mon', 'tue', 'wed', 'thr', 'fri', 'sat'];
    console.log(현재연도, 현재월, 현재일, 현재요일);

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
            for (let i = 0; i < 7; i++) {
                new 요소('요일', 국문요일명[i], 'div', 'rgba(55, 55, 55, 255)', '10vw', '100%', 영문요일명[i], { 
                    style: 'display:flex; justify-content:center; align-items:center;' 
                });
            }
        // 주별 컨테이너 생성
        for(let i=0; i<6; i++){
            new 요소('켈린더', `${i+1}주`, 'div', 'rgba(55, 55, 55, 255)', 'auto', '12.5%', '', { style: 'display:flex; justify-content:center; align-items:center;' });
                // 각 주의 7일 생성
                for(let j=0; j<7; j++){
                    new 요소(`${i+1}주`, `day${i}_${j}`, 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', i*7+j, { style: 'display:flex; justify-content:center; align-items:center; ' });
                }
        }

        // new 요소('켈린더', '첫째주', 'div', 'rgba(55, 55, 55, 255)', 'auto', '15%', '', { style: 'display:flex; justify-content:center; align-items:center;' });
        //     new 요소('첫째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '', { style: 'display:flex; justify-content:flex-end; align-items:flex-start;' });
        //     new 요소('첫째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '', { style: 'display:flex; justify-content:flex-end; align-items:flex-start;' });
        //     new 요소('첫째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '1', { style: 'display:flex; justify-content:flex-end; align-items:flex-start;' });
        //     new 요소('첫째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '2', {style: 'display:flex; justify-content:flex-end; align-items:flex-start;'});
        //     new 요소('첫째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '3', {style: 'display:flex; justify-content:flex-end; align-items:flex-start;'});
        //     new 요소('첫째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '4', {style: 'display:flex; justify-content:flex-end; align-items:flex-start;'});
        //     new 요소('첫째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '5', {style: 'display:flex; justify-content:flex-end; align-items:flex-start;'});
        // new 요소('켈린더', '둘째주', 'div', 'rgba(55, 55, 55, 255)', 'auto', '15%', '', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('둘째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '6', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('둘째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '7', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('둘째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '8', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('둘째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '9', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('둘째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '10', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('둘째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '11', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('둘째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '12', { style: 'display:flex; justify-content:center; align-items:center;'});
        // new 요소('켈린더', '셋째주', 'div', 'rgba(55, 55, 55, 255)', 'auto', '15%', '', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('셋째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '13', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('셋째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '14', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('셋째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '15', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('셋째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '16', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('셋째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '17', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('셋째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '18', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('셋째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '19', { style: 'display:flex; justify-content:center; align-items:center;'});
        // new 요소('켈린더', '넷째주', 'div', 'rgba(55, 55, 55, 255)', 'auto', '15%', '', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('넷째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '20', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('넷째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '21', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('넷째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '22', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('넷째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '23', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('넷째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '24', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('넷째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '25', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('넷째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '26', { style: 'display:flex; justify-content:center; align-items:center;'});
        // new 요소('켈린더', '다섯째주', 'div', 'rgba(55, 55, 55, 255)', 'auto', '15%', '', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('다섯째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '27', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('다섯째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '28', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('다섯째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '29', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('다섯째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '30', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('다섯째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '31', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('다섯째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '', { style: 'display:flex; justify-content:center; align-items:center;'});
        //     new 요소('다섯째주', '', 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', '', { style: 'display:flex; justify-content:center; align-items:center;'});
};