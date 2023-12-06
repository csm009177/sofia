// init createElement
export function createElement(type, props, ...children) {
  return {type, props, children};
}
// head comoponent
export function component(stateData) {
  const menuItems = [];
  for (let i = 0; i < stateData.length; i++) {
    const item = stateData[i];
    const menuItem = createElement(
      "li",
      {style: "margin:auto; list-style:none;"},
      createElement("a", {href: item.hash}, item.text)
    );
    menuItems.push(menuItem);
  }

  const menu = createElement(
    "ul",
    {
      style:
        "width: 100vw; height: 10vh; display: flex;  flex-direction: row; text-align: center; justify-content: center;      align-items: center;",
    },
    ...menuItems
  );
  return createElement("div", {}, menu); // retrun cont include menu and content
}

export function component2(elementNode, attributes, children) {
  let elementStr = `<${elementNode}`;
  for (let key in attributes) {
    elementStr += ` ${key} = "${attributes[key]}"`;
  }
  elementStr += ">";
  if (children) {
    children.forEach((child) => {
      if (typeof child === "string") {
        elementStr += child;
      } else {
        elementStr += component(child.elementNode, child.attributes, child.children);
      }
    });
  }
  elementStr += `</${elementNode}>`;
  return elementStr;
}

export function render(virtualDom) {
  if (typeof virtualDom === "string") {
    return document.createTextNode(virtualDom);
  }
  const element = document.createElement(virtualDom.type);
  if (virtualDom.props) {
    for (const [key, value] of Object.entries(virtualDom.props)) {
      element.setAttribute(key, value);
    }
  }
  for (let i = 0; i < virtualDom.children.length; i++) {
    const child = virtualDom.children[i];
    element.appendChild(render(child));
  }
  return element;
}
