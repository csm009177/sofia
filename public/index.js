import { component, render } from "./module/component.js"; // component.js 에서
import { hashChanger } from "./module/hashChanger.js";     // hashChanger.js 에서 hashChanger() 가져오기

const stateData = [
  { hash: '#home', text: 'home'},
  { hash: '#cpu', text: 'cpu'  },
  { hash: '#m/b', text: 'm/b'  },
  { hash: '#p/w', text: 'p/w'  },
  { hash: '#ram', text: 'ram'  },
  { hash: '#ssd', text: 'ssd'  },
  { hash: '#odd', text: 'odd'  },
  { hash: '#hdd', text: 'hdd'  },
  { hash: '#gpu', text: 'gpu'  },
];

// append
const headvirtualDom = component(stateData); // 상태데이터로 컴포넌트 만들어서 dom에 넣기
const root = document.getElementById("root"); // 어펜드할 대상 지정
root.appendChild(render(headvirtualDom)); // dom을 렌더해서 대상에 어펜드 하기