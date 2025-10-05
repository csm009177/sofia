import { 요소 } from './render.js';
import { 캘린더생성, 캘린더생성2} from './main/calendar.js';

export function 메인생성(){
    // 메인 컨테이너 생성
    new 요소('root', '메인', 'div', 'rgba(50, 50, 50, 255)', '100vw', '90vh', '', { 
        style: 'display:flex; justify-content:auto; align-items:center;' 
    });
    캘린더생성2();
}