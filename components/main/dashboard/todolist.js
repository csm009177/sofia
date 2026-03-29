import { 요소 } from '../../render.js';
import { TodoAPI } from '../../api.js';

// 라인 ID → DB id 매핑
const 라인DB맵 = new Map();
let 라인카운터 = 0;
let 현재포커스라인 = null;
let 저장타이머 = null;

/**
 * 투두리스트 생성 (DB에서 로드)
 */
export async function 투두리스트생성() {
  // 컨테이너
  new 요소('대쉬보드', '투두리스트', 'div', 'rgba(70, 70, 70, 255)', '27vw', '30vh', '', {
    style: 'margin:1vh 1vw; padding:1vh 1vw; border-radius:10px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); overflow-y:auto; position:relative; scrollbar-width:none; -ms-overflow-style:none;'
  });

  // 타이틀
  new 요소('투두리스트', '투두타이틀', 'div', 'transparent', '100%', 'auto', 'To Do List', {
    style: 'font-size:14px; font-weight:bold; margin-bottom:8px; color:white;'
  });

  // 에디터 컨테이너
  new 요소('투두리스트', '노션에디터', 'div', 'transparent', '100%', '100%', '', {
    style: 'min-height:80%; cursor:text; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;',
    onclick: '에디터클릭(event)'
  });

  // DB에서 기존 투두 로드
  try {
    const todos = await TodoAPI.전체조회();
    if (todos.length > 0) {
      for (const todo of todos) {
        노션라인생성(todo.text, 'todo', todo.id, todo.done);
      }
    } else {
      // 비어있으면 빈 라인 하나
      const newTodo = await TodoAPI.추가('', 0);
      노션라인생성('', 'todo', newTodo.id, 0);
    }
  } catch (err) {
    console.error('투두 로드 실패:', err);
    노션라인생성('', 'todo');
  }
}

// ─── 라인 생성 ───
function 노션라인생성(내용 = '', 타입 = 'todo', dbId = null, done = 0) {
  라인카운터++;
  const 라인ID = `라인${라인카운터}`;
  const 현재번호 = 라인카운터;

  if (dbId) 라인DB맵.set(라인ID, dbId);

  // 라인 컨테이너
  new 요소('노션에디터', 라인ID, 'div', 'transparent', '100%', 'auto', '', {
    style: 'display:flex; align-items:flex-start; min-height:28px; padding:2px 0; position:relative;'
  });

  // 왼쪽 액션 버튼
  new 요소(라인ID, `액션${현재번호}`, 'div', 'transparent', '24px', '24px', '', {
    style: 'display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity 0.2s; cursor:pointer; color:#999; font-size:12px; margin-right:4px;',
  });

  // 컨텐츠 영역
  new 요소(라인ID, `컨텐츠${현재번호}`, 'div', 'transparent', 'calc(100% - 28px)', 'auto', '', {
    style: 'min-height:24px; line-height:1.5; display:flex; align-items:center;'
  });

  if (타입 === 'todo') {
    // 체크박스
    const 체크텍스트 = done ? '☑' : '☐';
    const 체크색 = done ? '#0078d4' : '#999';
    new 요소(`컨텐츠${현재번호}`, `체크${현재번호}`, 'div', 'transparent', '18px', '18px', 체크텍스트, {
      style: `margin-right:8px; cursor:pointer; user-select:none; font-size:16px; color:${체크색}; display:flex; align-items:center; justify-content:center;`,
    });

    setTimeout(() => {
      const 체크박스 = document.querySelector(`[class="체크${현재번호}"]`);
      if (체크박스) {
        체크박스.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.투두토글(라인ID);
        });
      }
    }, 10);
  }

  // 텍스트 입력 영역
  const 텍스트스타일 = done
    ? 'outline:none; min-height:22px; padding:1px 2px; cursor:text; color:#999; text-decoration:line-through; opacity:0.6;'
    : 'outline:none; min-height:22px; padding:1px 2px; cursor:text; color:#ccc;';

  new 요소(`컨텐츠${현재번호}`, `텍스트${현재번호}`, 'div', 'transparent', '100%', 'auto', 내용 || '', {
    contentEditable: 'true',
    style: 텍스트스타일,
    onkeydown: `라인키처리(event, '${라인ID}')`,
    onfocus: `라인포커스('${라인ID}')`,
    oninput: `라인입력처리(event, '${라인ID}')`
  });

  // 호버 효과
  setTimeout(() => {
    const 라인요소 = document.querySelector(`[class="${라인ID}"]`);
    const 액션버튼 = document.querySelector(`[class="액션${현재번호}"]`);
    if (라인요소 && 액션버튼) {
      라인요소.addEventListener('mouseenter', () => { 액션버튼.style.opacity = '1'; 액션버튼.textContent = '+'; });
      라인요소.addEventListener('mouseleave', () => { 액션버튼.style.opacity = '0'; });
    }
  }, 10);

  return 라인ID;
}

// ─── 디바운스 저장 ───
function 디바운스저장(라인ID) {
  if (저장타이머) clearTimeout(저장타이머);
  저장타이머 = setTimeout(() => {
    const dbId = 라인DB맵.get(라인ID);
    if (!dbId) return;
    const 라인번호 = 라인ID.replace('라인', '');
    const 텍스트요소 = document.querySelector(`[class="텍스트${라인번호}"]`);
    if (텍스트요소) {
      TodoAPI.수정(dbId, { text: 텍스트요소.textContent.trim() });
    }
  }, 500);
}

// ─── 전역 이벤트 ───

window.에디터클릭 = async function (event) {
  if (event.target.className === '노션에디터') {
    try {
      const newTodo = await TodoAPI.추가('', 라인카운터);
      const 새라인 = 노션라인생성('', 'todo', newTodo.id, 0);
      setTimeout(() => {
        const 텍스트요소 = document.querySelector(`[class="텍스트${라인카운터}"]`);
        if (텍스트요소) 텍스트요소.focus();
      }, 10);
    } catch (err) {
      console.error('투두 추가 실패:', err);
    }
  }
};

window.라인키처리 = async function (event, 라인ID) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    try {
      const newTodo = await TodoAPI.추가('', 라인카운터);
      노션라인생성('', 'todo', newTodo.id, 0);
      setTimeout(() => {
        const 텍스트요소 = document.querySelector(`[class="텍스트${라인카운터}"]`);
        if (텍스트요소) 텍스트요소.focus();
      }, 10);
    } catch (err) {
      console.error('투두 추가 실패:', err);
    }
  }

  if (event.key === 'Backspace' && event.target.textContent.trim() === '') {
    event.preventDefault();
    const 모든라인 = document.querySelectorAll('[class^="라인"]');
    if (모든라인.length > 1) {
      const 현재라인 = document.querySelector(`[class="${라인ID}"]`);
      const 이전라인 = 현재라인?.previousElementSibling;

      // DB에서 삭제
      const dbId = 라인DB맵.get(라인ID);
      if (dbId) {
        TodoAPI.삭제(dbId);
        라인DB맵.delete(라인ID);
      }

      현재라인?.remove();

      if (이전라인) {
        const 이전번호 = 이전라인.className.replace('라인', '');
        const 이전텍스트 = document.querySelector(`[class="텍스트${이전번호}"]`);
        if (이전텍스트) {
          이전텍스트.focus();
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
};

window.라인입력처리 = function (event, 라인ID) {
  디바운스저장(라인ID);
};

window.라인포커스 = function (라인ID) {
  현재포커스라인 = 라인ID;
};

window.투두토글 = async function (라인ID) {
  const 라인번호 = 라인ID.replace('라인', '');
  const 체크박스 = document.querySelector(`[class="체크${라인번호}"]`);
  const 텍스트요소 = document.querySelector(`[class="텍스트${라인번호}"]`);
  const dbId = 라인DB맵.get(라인ID);

  if (체크박스 && 텍스트요소) {
    const isDone = 체크박스.textContent === '☐';
    체크박스.textContent = isDone ? '☑' : '☐';
    체크박스.style.color = isDone ? '#0078d4' : '#999';
    텍스트요소.style.textDecoration = isDone ? 'line-through' : 'none';
    텍스트요소.style.opacity = isDone ? '0.6' : '1';

    // DB 업데이트
    if (dbId) {
      try {
        await TodoAPI.수정(dbId, { done: isDone ? 1 : 0 });
      } catch (err) {
        console.error('투두 상태 저장 실패:', err);
      }
    }
  }
};

window.액션메뉴열기 = function (라인ID) {
  // 향후 확장: 삭제, 타입변환 등
};
