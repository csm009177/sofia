import { 요소 } from '../render.js';


//! 현재달의 첫번째 요일을 사용해서 매칭되는 현재달의 첫번째 주의 날짜부터 채우는 방식
export function 캘린더생성(년도 = null, 월 = null){
    // 매개변수가 없으면 현재 날짜 사용
    const 현재 = new Date();
    const 타겟연도 = 년도 || 현재.getFullYear();
    const 타겟월 = 월 !== null ? 월 : 현재.getMonth();
    const 현재일 = 현재.getDate();
    
    console.log(`${타겟연도}년 ${타겟월 + 1}월 캘린더 생성`);
    
    // 기존 캘린더 제거
    const 기존캘린더 = document.querySelector('.켈린더');
    if (기존캘린더) {
        기존캘린더.remove();
    }
    
    // 🎯 핵심 아이디어: 현재 달 1일이 속한 주의 일요일부터 시작
    const 해당월첫날 = new Date(타겟연도, 타겟월, 1);
    const 첫날요일인덱스 = 해당월첫날.getDay(); // 0=일요일, 1=월요일, ..., 6=토요일
    
    // 캘린더 시작 날짜 = 해당 월 1일이 속한 주의 일요일
    const 캘린더시작날짜 = new Date(타겟연도, 타겟월, 1 - 첫날요일인덱스);
    
    console.log(`이번 달 1일: ${해당월첫날.toLocaleDateString()}`);
    console.log(`1일의 요일: ${첫날요일인덱스} (0=일요일)`);
    console.log(`캘린더 시작 날짜: ${캘린더시작날짜.toLocaleDateString()}`);
    
    // 6주 x 7일 = 42일간의 캘린더 데이터 생성
    const 캘린더데이터 = [];
    
    for(let i = 0; i < 42; i++) {
        const 현재날짜객체 = new Date(캘린더시작날짜);
        현재날짜객체.setDate(캘린더시작날짜.getDate() + i);
        
        const 날짜정보 = {
            날짜객체: 현재날짜객체,
            년도: 현재날짜객체.getFullYear(),
            월: 현재날짜객체.getMonth(),
            일: 현재날짜객체.getDate(),
            요일: 현재날짜객체.getDay(),
            주차: Math.floor(i / 7) + 1,
            주내순서: i % 7,
            월타입: 현재날짜객체.getMonth() === 타겟월 ? '현재달' : 
                   현재날짜객체.getMonth() < 타겟월 ? '이전달' : '다음달'
        };
        
        캘린더데이터.push(날짜정보);
    }
    
    // 실제 몇 주까지 필요한지 계산 (빈 주 제거)
    let 필요한주수 = 6;
    for(let week = 5; week >= 4; week--) {
        const 해당주데이터 = 캘린더데이터.slice(week * 7, (week + 1) * 7);
        const 현재달날짜있음 = 해당주데이터.some(날짜 => 날짜.월타입 === '현재달');
        
        if (!현재달날짜있음) {
            필요한주수--;
        } else {
            break;
        }
    }
    
    console.log(`필요한 주 수: ${필요한주수}주`);
    
    // DOM 생성
    달력DOM생성(캘린더데이터, 타겟연도, 타겟월, 현재, 필요한주수);
}

function 달력DOM생성(캘린더데이터, 타겟연도, 타겟월, 현재, 필요한주수) {
    const 국문요일명 = ['일', '월', '화', '수', '목', '금', '토'];
    
    // 달력 컨테이너 생성
    new 요소('메인', '켈린더', 'div', 'rgba(55, 55, 55, 255)', '70vw', '90vh', '', { 
        style: 'display:block; justify-content:center; align-items:center; position:relative;' 
    });
    
    // 헤더 영역 (월 표시 + 네비게이션)
    new 요소('켈린더', '헤더영역', 'div', 'rgba(60, 60, 60, 255)', '70vw', '10%', '', { 
        style: 'display:flex; justify-content:space-between; align-items:center; position:relative;' 
    });
    
    // 이전 달 버튼
    new 요소('헤더영역', '이전달버튼', 'button', 'rgba(70, 70, 70, 255)', '60px', '40px', '◀', { 
        style: 'display:flex; justify-content:center; align-items:center; border:none; color:white; cursor:pointer; border-radius:5px;',
        onclick: `이전달보기(${타겟연도}, ${타겟월})`
    });
    
    // 월 표시 + 캘린더 정보
    new 요소('헤더영역', '월별', 'div', 'rgba(55, 55, 55, 255)', 'auto', '100%', `${타겟연도}년 ${타겟월 + 1}월`, { 
        style: 'display:flex; flex-direction:column; justify-content:center; align-items:center; font-size:20px; font-weight:bold;' 
    });
    
    // 다음 달 버튼
    new 요소('헤더영역', '다음달버튼', 'button', 'rgba(70, 70, 70, 255)', '60px', '40px', '▶', { 
        style: 'display:flex; justify-content:center; align-items:center; border:none; color:white; cursor:pointer; border-radius:5px;',
        onclick: `다음달보기(${타겟연도}, ${타겟월})`
    });
    
    // 요일 헤더 생성
    new 요소('켈린더', '요일헤더', 'div', 'rgba(55, 55, 55, 255)', 'auto', '8%', '', { 
        style: 'display:flex; justify-content:center; align-items:center;'
    });
    
    // 요일들 생성
    국문요일명.forEach((day, index) => {
        const dayStyle = 
            index === 0 ? 'display:flex; justify-content:center; align-items:center; color: #ff6b6b; font-weight:bold;' 
            : index === 6 ? 'display:flex; justify-content:center; align-items:center; color: #4dabf7; font-weight:bold;' 
            : 'display:flex; justify-content:center; align-items:center; font-weight:bold;';

        new 요소('요일헤더', `요일${index}`, 'div', 'rgba(55, 55, 55, 255)', '10vw', '100%', day, { style: dayStyle });
    });
    
    // 🎯 동적 주 수에 따른 높이 계산
    const 주높이퍼센트 = (90 - 18) / 필요한주수; // 전체 90% - 헤더 18% = 72%를 주 수로 나눔
    
    // 주별 날짜 생성
    for(let week = 0; week < 필요한주수; week++){
        new 요소('켈린더', `${week+1}주`, 'div', 'rgba(55, 55, 55, 255)', 'auto', `${주높이퍼센트}%`, '', { 
            style: 'display:flex; justify-content:center; align-items:center;'
        });

        // 각 주의 7일 생성
        for(let day = 0; day < 7; day++){
            const 날짜인덱스 = week * 7 + day;
            const 날짜정보 = 캘린더데이터[날짜인덱스];
            
            if (!날짜정보) continue; // 안전 장치
            
            // 스타일 계산
            let 배경색 = 'rgba(55, 55, 55, 255)';
            let 버튼스타일 = 'display:flex; justify-content:center; align-items:center; border:none; cursor:pointer; border-radius:3px; transition:all 0.2s ease;';
            
            if (날짜정보.월타입 === '현재달') {
                // 현재 달 날짜
                
                // 오늘 날짜 강조
                if (날짜정보.년도 === 현재.getFullYear() && 
                    날짜정보.월 === 현재.getMonth() && 
                    날짜정보.일 === 현재.getDate()) {
                    배경색 = 'rgba(100, 150, 255, 255)';
                    버튼스타일 += 'color:white; font-weight:bold; box-shadow: 0 0 15px rgba(100, 150, 255, 0.6); transform: scale(1.05);';
                } else {
                    // 요일별 색상
                    if (날짜정보.요일 === 0) { // 일요일
                        버튼스타일 += 'color: #ff6b6b; font-weight: 600;';
                    } else if (날짜정보.요일 === 6) { // 토요일
                        버튼스타일 += 'color: #4dabf7; font-weight: 600;';
                    } else {
                        버튼스타일 += 'color: white; font-weight: 500;';
                    }
                    
                    // 호버 효과
                    배경색 = 'rgba(65, 65, 65, 255)';
                }
                
            } else {
                // 이전달/다음달 날짜 (흐리게 표시)
                배경색 = 'rgba(45, 45, 45, 255)';
                버튼스타일 += 'opacity:0.35; color:#999; font-weight:300;';
            }
            
            new 요소(`${week+1}주`, `day${week}_${day}`, 'button', 배경색, '10vw', '100%', 날짜정보.일, { 
                style: 버튼스타일,
                onclick: `날짜클릭(${날짜정보.년도}, ${날짜정보.월}, ${날짜정보.일}, '${날짜정보.월타입}')`
            });
        }
    }
    
    // 캘린더 정보 로그
    console.log(`생성된 캘린더 정보:`);
    console.log(`- 시작일: ${캘린더데이터[0].날짜객체.toLocaleDateString()}`);
    console.log(`- 종료일: ${캘린더데이터[필요한주수 * 7 - 1].날짜객체.toLocaleDateString()}`);
    console.log(`- 표시 주수: ${필요한주수}주`);
}

// 날짜 클릭 이벤트
function 날짜클릭(년도, 월, 일, 월타입) {
    console.log(`클릭된 날짜: ${년도}년 ${월 + 1}월 ${일}일 (${월타입})`);
    
    if (월타입 === '현재달') {
        // 현재 달 날짜 클릭 - 일정 관련 동작
        console.log(`${일}일 일정 관리 모드`);
        // 여기에 일정 추가/조회 로직 구현
    } else {
        // 이전/다음 달 날짜 클릭 - 해당 월로 이동
        console.log(`${월타입} → ${년도}년 ${월 + 1}월로 이동`);
        캘린더생성(년도, 월);
    }
}

// 이전/다음 달 보기 함수들
function 이전달보기(현재년도, 현재월) {
    let 새년도 = 현재년도;
    let 새월 = 현재월 - 1;
    
    if (새월 < 0) {
        새월 = 11;
        새년도--;
    }
    
    console.log(`이전 달로: ${새년도}년 ${새월 + 1}월`);
    캘린더생성(새년도, 새월);
}

function 다음달보기(현재년도, 현재월) {
    let 새년도 = 현재년도;
    let 새월 = 현재월 + 1;
    
    if (새월 > 11) {
        새월 = 0;
        새년도++;
    }
    
    console.log(`다음 달로: ${새년도}년 ${새월 + 1}월`);
    캘린더생성(새년도, 새월);
}

// 전역 함수로 등록
window.이전달보기 = 이전달보기;
window.다음달보기 = 다음달보기;
window.날짜클릭 = 날짜클릭;