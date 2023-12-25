import { createElement, component, render } from "./component";
import { createElement } from "./component";


// state cont
const bigCont = 
createElement("div", {id:"bigcont"}, 
    createElement("div", {id:"head",}, ),
    createElement("div", {id:"body",}, ),
    createElement("div", {id:"foot",},),    
)
const root = document.getElementById('root');
root.appendChild(render(bigCont));