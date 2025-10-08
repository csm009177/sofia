import { 요소 } from '../render.js';  // ← 경로 수정 (../../components/render.js → ../render.js)

export function 캘린더생성2(){
    // 현재 날짜 정보 가져오기
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0부터 시작 (0=1월, 1=2월...)
    const currentDate = now.getDate();
    console.log(currentYear, currentMonth, currentDate);
    // 월 이름 배열
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', 
                       '7월', '8월', '9월', '10월', '11월', '12월'];
    
    // 요일 배열
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    
    // 해당 월의 첫 번째 날과 마지막 날 구하기
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    // 해당 월의 총 일수 구하기
    const daysInMonth = lastDay.getDate();
    // 해당 월의 첫 번째 날의 요일 구하기
    const startDayOfWeek = firstDay.getDay(); // 0=일요일, 1=월요일...
    
    // 이전 달의 마지막 날들도 계산
    const prevMonth = new Date(currentYear, currentMonth, 0);
    const prevMonthDays = prevMonth.getDate();
    
    // 캘린더 컨테이너 생성
    new 요소('메인', '켈린더', 'div', 'rgba(55, 55, 55, 255)', '70vw', '90vh', '', { 
        style: 'display:block; justify-content:center; align-items:center;'
    });
    
    // 월별 표시 (현재 월 동적 표시)
    const monthDisplayText = `${currentYear}년 ${monthNames[currentMonth]}`;
    new 요소('켈린더', '월별', 'div', 'rgba(55, 55, 55, 255)', '70vw', '10%', monthDisplayText, { 
        style: 'display:flex; justify-content:center; align-items:center; font-size: 1.2em; font-weight: bold;', 
        onclick: `location.href="/${currentMonth + 1}month"` 
    });
    
    // 요일 헤더 생성
    new 요소('켈린더', '요일', 'div', 'rgba(55, 55, 55, 255)', 'auto', '15%', '', { 
        style: 'display:flex; justify-content:center; align-items:center;'
    });
    
    dayNames.forEach((day, index) => {
        const dayStyle = index === 0 ? 'display:flex; justify-content:center; align-items:center; color: #ff6b6b;' : // 일요일은 빨간색
                         index === 6 ? 'display:flex; justify-content:center; align-items:center; color: #4dabf7;' : // 토요일은 파란색
                         'display:flex; justify-content:center; align-items:center;';
        new 요소('요일', `요일${index}`, 'div', 'rgba(55, 55, 55, 255)', '10vw', '100%', day, { 
            style: dayStyle 
        });
    });
    
    // 캘린더 날짜 생성
    let dateCounter = 1;
    let nextMonthCounter = 1;
    
    // 6주 생성 (대부분의 월은 6주 안에 들어감)
    for (let week = 0; week < 6; week++) {
        const weekNames = ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주', '여섯째주'];
        const weekId = weekNames[week];
        
        new 요소('켈린더', weekId, 'div', 'rgba(55, 55, 55, 255)', 'auto', '12.5%', '', { 
            style: 'display:flex; justify-content:center; align-items:center;'
        });
        
        // 각 주의 7일 생성
        for (let day = 0; day < 7; day++) {
            let dateText = '';
            let buttonStyle = 'display:flex; justify-content:center; align-items:center; border: none; cursor: pointer; background-color: rgba(55, 55, 55, 255);';
            let isCurrentMonth = false;
            let actualDate = 0;
            
            // 첫 번째 주에서 이전 달 날짜들
            if (week === 0 && day < startDayOfWeek) {
                dateText = (prevMonthDays - startDayOfWeek + day + 1).toString();
                buttonStyle += ' color: #666; opacity: 0.5;';
            }
            // 현재 달 날짜들
            else if (dateCounter <= daysInMonth) {
                dateText = dateCounter.toString();
                actualDate = dateCounter;
                isCurrentMonth = true;
                
                // 오늘 날짜 강조
                if (dateCounter === currentDate) {
                    buttonStyle += ' background-color: rgba(100, 150, 255, 255); color: white; font-weight: bold; border-radius: 50%;';
                }
                
                // 주말 색상 적용
                if (day === 0) { // 일요일
                    buttonStyle += ' color: #ff6b6b;';
                } else if (day === 6) { // 토요일
                    buttonStyle += ' color: #4dabf7;';
                } else {
                    buttonStyle += ' color: white;';
                }
                
                dateCounter++;
            }
            // 다음 달 날짜들
            else {
                dateText = nextMonthCounter.toString();
                buttonStyle += ' color: #666; opacity: 0.5;';
                nextMonthCounter++;
            }
            
            // 클릭 이벤트 생성
            let clickEvent = '';
            if (isCurrentMonth) {
                clickEvent = `alert('${currentYear}년 ${monthNames[currentMonth]} ${actualDate}일 선택됨')`;
            }
            
            new 요소(weekId, `day${week}_${day}`, 'button', 'rgba(55, 55, 55, 255)', '10vw', '100%', dateText, { 
                style: buttonStyle,
                onclick: clickEvent
            });
        }
        
        // 모든 날짜를 표시했고 다음 달 날짜도 충분히 표시했으면 종료
        if (dateCounter > daysInMonth && nextMonthCounter > 7) break;
    }
    
    // 할일 목록 섹션
    new 요소('메인', '할일목록', 'div', 'rgba(55, 55, 55, 255)', '30vw', '90vh', '', { 
        style: 'display:block; justify-content:center; align-items:center; padding: 10px;'
    });
    
    // 할일 목록 헤더
    new 요소('할일목록', '할일헤더', 'div', 'rgba(60, 60, 60, 255)', '100%', '8%', '오늘의 할 일', { 
        style: 'display:flex; justify-content:center; align-items:center; font-weight: bold; margin-bottom: 10px;'
    });
    
    // 할일 목록 아이템들
    const todoItems = [
        '프로젝트 완료하기',
        '회의 참석하기',
        '문서 작성하기',
        '코드 리뷰하기'
    ];
    
    todoItems.forEach((item, index) => {
        const todoId = `할일${index + 1}`;
        new 요소('할일목록', todoId, 'div', 'rgba(65, 65, 65, 255)', '95%', '12%', '', { 
            style: 'display:flex; justify-content:space-between; align-items:center; margin: 5px; padding: 10px; border-radius: 5px;'
        });
        
        new 요소(todoId, `텍스트${index}`, 'span', 'transparent', 'auto', 'auto', item, { 
            style: 'flex: 1; text-align: left;'
        });
        
        new 요소(todoId, `완료버튼${index}`, 'button', 'rgba(70, 130, 180, 255)', '60px', '30px', '완료', { 
            style: 'display:flex; justify-content:center; align-items:center; border: none; border-radius: 3px; cursor: pointer;',
            onclick: `alert('${item} 완료!')`
        });
    });
}