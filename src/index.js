// import * as htmlEntities from "html-entities"

/**
 * 
 * @param {Node} node 
 * @param {Function} func 
 */
function walkTextNodes(node, func) {
  function walk(node) {
    if (node.hasChildNodes() && !['style', 'script'].includes(node.nodeName)) {
      if (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
        func(node)
      } else {
        console.log(node)
        node.childNodes.forEach(walk)
      }
    }
  }
  walk(node)
}

export default function (Alpine) {
  Alpine.directive(
    'tash',
    (el, { modifiers, expression }, { evaluate, effect }) => {

      const useVue = modifiers.includes('vue')
      const useAngular = modifiers.includes('angular')

      /* pomsky
let bracketed = "(" Codepoint* lazy ")" ;
let not_bracketed = Codepoint* lazy ;

let expression = ( bracketed | not_bracketed )* lazy ;

"{" :(expression) "}"
      */

      const finderRegex = useVue ? /\{\{ ((?:\([\s\S]*?\)|[\s\S]*?)*?) \}\}/g :
        useAngular ? /\{\{((?:\([\s\S]*?\)|[\s\S]*?)*?)\}\}/g : /\{((?:\([\s\S]*?\)|[\s\S]*?)*?)\}/g

      effect(() => {
        walkTextNodes(el, (textNode) => {
          textNode.textContent = textNode.textContent.replace(finderRegex, (substring, expression) => evaluate(expression))
        })
      })
    }
  )
}
