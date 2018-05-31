let testElement = {
  childNodes: [1,2,3]
}


let getNthChild = (el, n) => el.childNodes[n - 1]

console.log(
  `${testElement.childNodes[0]} ===`, getNthChild(testElement, 1)
)
