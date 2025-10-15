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
    
    // 날짜 계산
    const 해당월의첫째날 = new Date(타겟연도, 타겟월, 1);
    const 해당월의마지막날 = new Date(타겟연도, 타겟월 + 1, 0);
    const 해당월의총일수 = 해당월의마지막날.getDate();
    const 해당월의첫째날요일 = 해당월의첫째날.getDay();
    
    // 이전 달 계산
    const 이전달 = new Date(타겟연도, 타겟월, 0);
    const 이전달의총일수 = 이전달.getDate();
    const 이전달의마지막주날들 = 이전달의총일수 - 해당월의첫째날요일 + 1;
    
    // 요일명
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
    
    // 캘린더 날짜 생성
    let 날짜카운터 = 1;
    let 다음달카운터 = 1;
    let 전체카운터 = 0;
    
    // 6주 생성
    for(let week = 0; week < 6; week++){
        new 요소('켈린더', `${week+1}주`, 'div', 'rgba(55, 55, 55, 255)', 'auto', '13.3%', '', { 
            style: 'display:flex; justify-content:center; align-items:center;'
        });

        // 각 주의 7일 생성
        for(let day = 0; day < 7; day++){
            let 표시할날짜 = '';
            let 버튼스타일 = 'display:flex; justify-content:center; align-items:center; border:none; cursor:pointer; border-radius:3px; transition:background-color 0.2s;';
            let 배경색 = 'rgba(55, 55, 55, 255)';
            
            if (전체카운터 < 해당월의첫째날요일) {
                // 이전 달의 날짜들
                표시할날짜 = 이전달의마지막주날들 + 전체카운터;
                버튼스타일 += 'opacity:0.3; color:#888;';
                배경색 = 'rgba(45, 45, 45, 255)';
            } else if (날짜카운터 <= 해당월의총일수) {
                // 현재 달의 날짜들
                표시할날짜 = 날짜카운터;
                
                // 오늘 날짜 강조 (현재 보고 있는 달이 실제 현재 달일 때만)
                if (타겟연도 === 현재.getFullYear() && 타겟월 === 현재.getMonth() && 날짜카운터 === 현재일) {
                    배경색 = 'rgba(100, 150, 255, 255)';
                    버튼스타일 += 'color:white; font-weight:bold; box-shadow: 0 0 10px rgba(100, 150, 255, 0.5);';
                } else {
                    // 주말 색상
                    if (day === 0) { // 일요일
                        버튼스타일 += 'color: #ff6b6b;';
                    } else if (day === 6) { // 토요일
                        버튼스타일 += 'color: #4dabf7;';
                    } else {
                        버튼스타일 += 'color: white;';
                    }
                }
                
                // 호버 효과
                버튼스타일 += ':hover { background-color: rgba(80, 80, 80, 255); }';
                
                날짜카운터++;
            } else {
                // 다음 달의 날짜들
                표시할날짜 = 다음달카운터;
                다음달카운터++;
                버튼스타일 += 'opacity:0.3; color:#888;';
                배경색 = 'rgba(45, 45, 45, 255)';
            }
            
            new 요소(`${week+1}주`, `day${week}_${day}`, 'button', 배경색, '10vw', '100%', 표시할날짜, { 
                style: 버튼스타일
            });
            
            전체카운터++;
        }
        
        // 모든 날짜를 표시했으면 루프 종료
        if (날짜카운터 > 해당월의총일수 && 다음달카운터 > 7) break;
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

// 전역 함수로 등록 (onclick에서 사용)
window.이전달보기 = 이전달보기;
window.다음달보기 = 다음달보기;