import {요소} from '../render.js';
import {투두리스트생성} from './dashboard/todolist.js';



export function 대쉬보드생성(){
    // 데쉬보드 컨테이너
    new 요소('메인', '대쉬보드', 'div', 'rgba(50, 50, 50, 255)', '29vw', '89vh', '', {});
        // 공지사항
        new 요소('대쉬보드', '공지사항', 'div', 'rgba(70, 70, 70, 255)', '27vw', '20vh', '공지', { 
            style: 'margin:1vh 1vw; padding:1vh 1vw; border-radius:10px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); overflow-y:auto;' 
        });
        // 숙제영역
        new 요소('대쉬보드', '숙제영역', 'div', 'rgba(70, 70, 70, 255)', '27vw', '30vh', '숙제', { 
            style: 'margin:1vh 1vw; padding:1vh 1vw; border-radius:10px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); overflow-y:auto;' 
        });
        // 투두
        투두리스트생성();

}


