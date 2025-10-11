import { 요소 } from '../render.js';  // ← 경로 수정 (../../components/render.js → ../render.js)

export function 클래스페이지(){
    return 요소('div', { class: 'class-page' }, [
        요소('h1', {}, '클래스 페이지'),
        요소('p', {}, '여기에 클래스 관련 내용을 추가하세요.')
    ]);
};