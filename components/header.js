import { 요소 } from './render.js';  

export function 헤더생성(){
    new 요소('root', '헤더', 'div', 'rgba(50, 50, 50, 255)', '100vw', '5vh', '', { style: 'display:flex; justify-content:space-between; align-items:center;' });
        new 요소('헤더', '홈버튼', 'button', 'rgba(55, 55, 55, 255)', '10vw', '5vh', 'home', { style: 'display:flex; justify-content:center; align-items:center;', onclick: 'location.href="/"' });
        new 요소('헤더', '보드메뉴', 'div', 'rgba(55, 55, 55, 255)', 'auto', 'auto', '', { style: 'display:flex; justify-content:center; align-items:center;' });
            new 요소('보드메뉴', '클래스페이지', 'button', 'rgba(55, 55, 55, 255)', '10vw', '5vh', '클래스', { style: 'display:flex; justify-content:center; align-items:center;', onclick: 'location.href="/class"' });
            new 요소('보드메뉴', '과제페이지', 'button', 'rgba(55, 55, 55, 255)', '10vw', '5vh', '과제', { style: 'display:flex; justify-content:center; align-items:center;', onclick: 'location.href="/homework"' });
            new 요소('보드메뉴', '자료페이지', 'button', 'rgba(55, 55, 55, 255)', '10vw', '5vh', '자료', { style: 'display:flex; justify-content:center; align-items:center;', onclick: 'location.href="/source"' });
            new 요소('보드메뉴', '알림페이지', 'button', 'rgba(55, 55, 55, 255)', '10vw', '5vh', '알림', { style: 'display:flex; justify-content:center; align-items:center;', onclick: 'location.href="/alram"' });
    new 요소('헤더', '설정메뉴', 'div', 'rgba(55, 55, 55, 255)', 'auto', 'auto', '', { style: 'display:flex; justify-content:center; align-items:center;'});
        new 요소('설정메뉴', '다크모드', 'button', 'rgba(55, 55, 55, 255)', '10vw', '5vh', '다크모드', { style: 'display:flex; justify-content:center; align-items:center;', onclick: 'location.href="/alram"' });
        new 요소('설정메뉴', '언어모드', 'button', 'rgba(55, 55, 55, 255)', '10vw', '5vh', '언어', { style: 'display:flex; justify-content:center; align-items:center;', onclick: 'location.href="/alram"' });
        new 요소('설정메뉴', '로그인', 'button', 'rgba(55, 55, 55, 255)', '10vw', '5vh', '로그인', { style: 'display:flex; justify-content:center; align-items:center;', onclick: 'location.href="/alram"' });
}