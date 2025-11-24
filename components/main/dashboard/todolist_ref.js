import { 요소 } from '../../render.js';  // 두 단계 위로 올라가야 함

export function 투두리스트생성(){
    // 투두리스트 컨테이너
    new 요소('대쉬보드', '투두리스트', 'div', 'rgba(70, 70, 70, 255)', '27vw', '30vh', 'To Do List', { 
        style: 'margin:1vh 1vw; padding:1vh 1vw; border-radius:10px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); overflow-y:auto; position:relative; scrollbar-width:none; -ms-overflow-style:none;' 
    });
    

    
    // 노션 스타일 에디터 컨테이너
    new 요소('투두리스트', '노션에디터', 'div', 'transparent', '100%', '100%', '', { 
        style: 'min-height:100%; cursor:text; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;',
        onclick: '에디터클릭(event)'
    });
    
    // 초기 빈 투두 라인 생성
    노션라인생성('', 'todo');
}

// 전역 변수
let 라인카운터 = 0;
let 현재포커스라인 = null;

// 노션 스타일 라인 생성
function 노션라인생성(내용 = '', 타입 = 'paragraph') {
    라인카운터++;
    const 라인ID = `라인${라인카운터}`;
    
    // 라인 컨테이너
    new 요소('노션에디터', 라인ID, 'div', 'transparent', '100%', 'auto', '', { 
        style: 'display:flex; align-items:flex-start; min-height:28px; padding:2px 0; position:relative; group:hover;'
    });
    
    // 왼쪽 액션 버튼 (호버 시 나타남)
    new 요소(라인ID, `액션${라인카운터}`, 'div', 'transparent', '24px', '24px', '', { 
        style: 'display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity 0.2s; cursor:pointer; color:#999; font-size:12px; margin-right:4px;',
        onclick: `액션메뉴열기('${라인ID}')`
    });
    
    // 메인 컨텐츠 영역
    new 요소(라인ID, `컨텐츠${라인카운터}`, 'div', 'transparent', 'calc(100% - 28px)', 'auto', '', { 
        style: 'min-height:24px; line-height:1.5; display:flex; align-items:center;'
    });
    
    if (타입 === 'todo') {
        // 투두 체크박스
        new 요소(`컨텐츠${라인카운터}`, `체크${라인카운터}`, 'div', 'transparent', '18px', '18px', '☐', { 
            style: 'margin-right:8px; cursor:pointer; user-select:none; font-size:16px; color:#999; display:flex; align-items:center; justify-content:center;',
            onclick: `window.투두토글('${라인ID}')`
        });
        
        // 추가 안전장치: 직접 이벤트 리스너 추가
        setTimeout(() => {
            const 체크박스 = document.getElementById(`체크${라인카운터}`);
            if (체크박스) {
                체크박스.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.투두토글(라인ID);
                });
                console.log('체크박스 이벤트 리스너 추가됨:', `체크${라인카운터}`); // 디버깅용
            }
        }, 10);
    }
    
    // 텍스트 입력/표시 영역
    new 요소(`컨텐츠${라인카운터}`, `텍스트${라인카운터}`, 'div', 'transparent', '100%', 'auto', 내용 || '', { 
        contentEditable: 'true',
        style: 'outline:none; min-height:22px; padding:1px 2px; cursor:text; color:#333;',
        onkeydown: `라인키처리(event, '${라인ID}')`,
        onfocus: `라인포커스('${라인ID}')`,
        onblur: `라인블러('${라인ID}')`,
        oninput: `라인입력처리(event, '${라인ID}')`
    });
    
    // 호버 효과 추가
    setTimeout(() => {
        const 라인요소 = document.getElementById(라인ID);
        const 액션버튼 = document.getElementById(`액션${라인카운터}`);
        
        if (라인요소 && 액션버튼) {
            라인요소.addEventListener('mouseenter', () => {
                액션버튼.style.opacity = '1';
                액션버튼.textContent = '+';
            });
            
            라인요소.addEventListener('mouseleave', () => {
                액션버튼.style.opacity = '0';
            });
        }
    }, 10);
    
    return 라인ID;
}

// 에디터 클릭 처리
window.에디터클릭 = function(event) {
    if (event.target.id === '노션에디터') {
        // 빈 공간 클릭 시 새 투두 라인 생성
        const 새라인 = 노션라인생성('', 'todo');
        setTimeout(() => {
            const 텍스트요소 = document.querySelector(`#텍스트${라인카운터}`);
            if (텍스트요소) {
                텍스트요소.focus();
                // 커서를 텍스트 끝에 위치
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(텍스트요소);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }, 10);
    }
}

// 라인 키 처리
window.라인키처리 = function(event, 라인ID) {
    const 라인번호 = 라인ID.replace('라인', '');
    
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        
        // 새 투두 라인 생성 (체크박스 포함)
        const 새라인 = 노션라인생성('', 'todo');
        
        // 새 라인의 텍스트 입력 영역에 포커스 및 커서 위치 설정
        setTimeout(() => {
            const 새텍스트요소 = document.querySelector(`#텍스트${라인카운터}`);
            if (새텍스트요소) {
                새텍스트요소.focus();
                // 커서를 텍스트 시작 부분에 위치 (빈 텍스트이므로)
                const range = document.createRange();
                const sel = window.getSelection();
                
                // 텍스트 요소가 비어있으면 내부에 커서를 위치
                if (새텍스트요소.childNodes.length === 0) {
                    새텍스트요소.innerHTML = '&nbsp;'; // 임시 공백 삽입
                }
                
                range.setStart(새텍스트요소, 0);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                
                // 임시 공백 제거
                if (새텍스트요소.innerHTML === '&nbsp;') {
                    새텍스트요소.innerHTML = '';
                }
            }
        }, 10);
    }
    
    if (event.key === 'Backspace' && event.target.textContent.trim() === '') {
        event.preventDefault();
        
        // 빈 라인 삭제 (첫 번째 라인이 아닌 경우)
        const 모든라인 = document.querySelectorAll('[id^="라인"]');
        if (모든라인.length > 1) {
            const 현재라인 = document.getElementById(라인ID);
            const 이전라인 = 현재라인?.previousElementSibling;
            
            현재라인?.remove();
            
            // 이전 라인에 포커스 및 커서 위치 설정
            if (이전라인) {
                const 이전번호 = 이전라인.id.replace('라인', '');
                const 이전텍스트 = document.querySelector(`#텍스트${이전번호}`);
                if (이전텍스트) {
                    이전텍스트.focus();
                    // 커서를 텍스트 끝에 위치
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(이전텍스트);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
    }
    
    // 슬래시 명령어 처리
    if (event.key === '/') {
        setTimeout(() => {
            const 텍스트 = event.target.textContent;
            if (텍스트.includes('/todo')) {
                event.target.textContent = 텍스트.replace('/todo', '');
                라인을투두로변환(라인ID);
            }
        }, 10);
    }
}

// 라인 입력 처리
window.라인입력처리 = function(event, 라인ID) {
    const 텍스트요소 = event.target;
    텍스트요소.style.color = '#333';
}

// 라인 포커스
window.라인포커스 = function(라인ID) {
    현재포커스라인 = 라인ID;
}

// 라인 블러
window.라인블러 = function(라인ID) {
    // 포커스 해제시 특별한 처리 없음
}

// 라인을 투두로 변환
function 라인을투두로변환(라인ID) {
    const 라인번호 = 라인ID.replace('라인', '');
    const 컨텐츠요소 = document.querySelector(`#컨텐츠${라인번호}`);
    
    if (컨텐츠요소) {
        // 체크박스가 없으면 추가
        if (!document.querySelector(`#체크${라인번호}`)) {
            const 체크박스 = document.createElement('div');
            체크박스.id = `체크${라인번호}`;
            체크박스.textContent = '☐';
            체크박스.style.cssText = 'margin-right:8px; cursor:pointer; user-select:none; font-size:16px; color:#999; display:flex; align-items:center; justify-content:center; width:18px; height:18px;';
            체크박스.onclick = function() { 투두토글(라인ID); };
            
            컨텐츠요소.insertBefore(체크박스, 컨텐츠요소.firstChild);
        }
    }
}

// 투두 토글
window.투두토글 = function(라인ID) {
    console.log('투두토글 호출됨:', 라인ID); // 디버깅용
    
    const 라인번호 = 라인ID.replace('라인', '');
    const 체크박스 = document.querySelector(`#체크${라인번호}`);
    const 텍스트요소 = document.querySelector(`#텍스트${라인번호}`);
    
    console.log('체크박스:', 체크박스, '텍스트요소:', 텍스트요소); // 디버깅용
    
    if (체크박스 && 텍스트요소) {
        console.log('현재 체크박스 상태:', 체크박스.textContent); // 디버깅용
        
        if (체크박스.textContent === '☐') {
            체크박스.textContent = '☑';
            체크박스.style.color = '#0078d4';
            텍스트요소.style.textDecoration = 'line-through';
            텍스트요소.style.opacity = '0.6';
            console.log('체크됨으로 변경'); // 디버깅용
        } else {
            체크박스.textContent = '☐';
            체크박스.style.color = '#999';
            텍스트요소.style.textDecoration = 'none';
            텍스트요소.style.opacity = '1';
            console.log('체크 해제됨으로 변경'); // 디버깅용
        }
    } else {
        console.log('체크박스 또는 텍스트요소를 찾을 수 없음'); // 디버깅용
    }
}

// 액션 메뉴 열기
window.액션메뉴열기 = function(라인ID) {
    // 간단한 메뉴로 투두 변환
    라인을투두로변환(라인ID);
}