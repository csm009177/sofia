import { 요소 } from '../render.js';

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
    
    // 🎯 이전달의 마지막 일요일부터 시작하는 날짜 계산
    const 해당월첫날 = new Date(타겟연도, 타겟월, 1);
    const 해당월첫날요일 = 해당월첫날.getDay(); // 0=일요일
    
    // 캘린더 시작 날짜 = 이전달의 마지막 일요일
    const 캘린더시작날 = new Date(타겟연도, 타겟월, 1 - 해당월첫날요일);
    
    console.log(`캘린더 시작일: ${캘린더시작날.getFullYear()}년 ${캘린더시작날.getMonth() + 1}월 ${캘린더시작날.getDate()}일`);
    
    // 6주 x 7일 = 42일간의 날짜 배열 생성
    const 달력데이터 = [];
    
    for(let i = 0; i < 42; i++) {
        const 현재날짜 = new Date(캘린더시작날);
        현재날짜.setDate(캘린더시작날.getDate() + i);
        
        const 날짜정보 = {
            년도: 현재날짜.getFullYear(),
            월: 현재날짜.getMonth(),
            일: 현재날짜.getDate(),
            요일: 현재날짜.getDay(),
            타입: 현재날짜.getMonth() === 타겟월 ? '현재달' : 
                  현재날짜.getMonth() < 타겟월 ? '이전달' : '다음달'
        };
        
        달력데이터.push(날짜정보);
    }
    
    // DOM 생성
    달력DOM생성(달력데이터, 타겟연도, 타겟월, 현재);
}

function 달력DOM생성(달력데이터, 타겟연도, 타겟월, 현재) {
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
    
    // 월 표시
    new 요소('헤더영역', '월별', 'div', 'rgba(55, 55, 55, 255)', 'auto', '100%', `${타겟연도}년 ${타겟월 + 1}월`, { 
        style: 'display:flex; justify-content:center; align-items:center; font-size:20px; font-weight:bold;' 
    });
    
    // 다음 달 버튼
    new 요소('헤더영역', '다음달버튼', 'button', 'rgba(70, 70, 70, 255)', '60px', '40px', '▶', { 
        style: 'display:flex; justify-content:center; align-items:center; border:none; color:white; cursor:pointer; border-radius:5px;',
        onclick: `다음달보기(${타겟연도}, ${타겟월})`
    });
    
    // 요일 헤더 생성
    new 요소('켈린더', '요일', 'div', 'rgba(55, 55, 55, 255)', 'auto', '10%', '', { 
        style: 'display:flex; justify-content:center; align-items:center;'
    });
    
    // 요일들 생성
    국문요일명.forEach((day, index) => {
        const dayStyle = 
            index === 0 ? 'display:flex; justify-content:center; align-items:center; color: #ff6b6b; font-weight:bold;' 
            : index === 6 ? 'display:flex; justify-content:center; align-items:center; color: #4dabf7; font-weight:bold;' 
            : 'display:flex; justify-content:center; align-items:center; font-weight:bold;';

        new 요소('요일', `요일${index}`, 'div', 'rgba(55, 55, 55, 255)', '10vw', '100%', day, { style: dayStyle });
    });
    
    // 🎯 간단해진 날짜 생성 로직
    for(let week = 0; week < 6; week++){
        new 요소('켈린더', `${week+1}주`, 'div', 'rgba(55, 55, 55, 255)', 'auto', '13.3%', '', { 
            style: 'display:flex; justify-content:center; align-items:center;'
        });

        // 각 주의 7일 생성
        for(let day = 0; day < 7; day++){
            const 인덱스 = week * 7 + day;
            const 날짜정보 = 달력데이터[인덱스];
            
            // 스타일 계산
            let 배경색 = 'rgba(55, 55, 55, 255)';
            let 버튼스타일 = 'display:flex; justify-content:center; align-items:center; border:none; cursor:pointer; border-radius:3px; transition:background-color 0.2s;';
            
            if (날짜정보.타입 === '현재달') {
                // 현재 달 날짜
                
                // 오늘 날짜 강조
                if (날짜정보.년도 === 현재.getFullYear() && 
                    날짜정보.월 === 현재.getMonth() && 
                    날짜정보.일 === 현재.getDate()) {
                    배경색 = 'rgba(100, 150, 255, 255)';
                    버튼스타일 += 'color:white; font-weight:bold; box-shadow: 0 0 10px rgba(100, 150, 255, 0.5);';
                } else {
                    // 요일별 색상
                    if (날짜정보.요일 === 0) { // 일요일
                        버튼스타일 += 'color: #ff6b6b;';
                    } else if (날짜정보.요일 === 6) { // 토요일
                        버튼스타일 += 'color: #4dabf7;';
                    } else {
                        버튼스타일 += 'color: white;';
                    }
                }
                
                // 호버 효과
                버튼스타일 += ':hover { background-color: rgba(80, 80, 80, 255); }';
                
            } else {
                // 이전달/다음달 날짜 (흐리게)
                배경색 = 'rgba(45, 45, 45, 255)';
                버튼스타일 += 'opacity:0.3; color:#888;';
            }
            
            new 요소(`${week+1}주`, `day${week}_${day}`, 'button', 배경색, '10vw', '100%', 날짜정보.일, { 
                style: 버튼스타일,
                onclick: `날짜클릭(${날짜정보.년도}, ${날짜정보.월}, ${날짜정보.일}, '${날짜정보.타입}')`
            });
        }
    }
}

// 날짜 클릭 이벤트
function 날짜클릭(년도, 월, 일, 타입) {
    if (타입 === '현재달') {
        console.log(`${년도}년 ${월 + 1}월 ${일}일이 선택되었습니다.`);
        // 일정 추가/조회 로직
    } else {
        console.log(`${타입} ${일}일 클릭 - ${년도}년 ${월 + 1}월로 이동`);
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
    
    캘린더생성(새년도, 새월);
}

function 다음달보기(현재년도, 현재월) {
    let 새년도 = 현재년도;
    let 새월 = 현재월 + 1;
    
    if (새월 > 11) {
        새월 = 0;
        새년도++;
    }
    
    캘린더생성(새년도, 새월);
}

// 전역 함수로 등록
window.이전달보기 = 이전달보기;
window.다음달보기 = 다음달보기;
window.날짜클릭 = 날짜클릭;