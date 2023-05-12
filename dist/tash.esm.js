// src/index.js
function walkTextNodes(node, func) {
  function walk(node2) {
    if (node2.hasChildNodes() && !["style", "script"].includes(node2.nodeName)) {
      if (node2.childNodes.length === 1 && node2.childNodes[0].nodeType === 3) {
        func(node2);
      } else {
        console.log(node2);
        node2.childNodes.forEach(walk);
      }
    }
  }
  walk(node);
}
function src_default(Alpine) {
  Alpine.directive(
    "tash",
    (el, { modifiers, expression }, { evaluate, effect }) => {
      const useVue = modifiers.includes("vue");
      const useAngular = modifiers.includes("angular");
      const finderRegex = useVue ? /\{\{ ((?:\([\s\S]*?\)|[\s\S]*?)*?) \}\}/g : useAngular ? /\{\{((?:\([\s\S]*?\)|[\s\S]*?)*?)\}\}/g : /\{((?:\([\s\S]*?\)|[\s\S]*?)*?)\}/g;
      effect(() => {
        walkTextNodes(el, (textNode) => {
          textNode.textContent = textNode.textContent.replace(finderRegex, (substring, expression2) => evaluate(expression2));
        });
      });
    }
  );
}

// builds/module.js
var module_default = src_default;
export {
  module_default as default
};
