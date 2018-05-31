
let getNthChild = (el, n) => el.childNodes[n - 1]

let testForHttpPrefix = url => {
  let re = /^https?:\/\//
  return re.test(url)
}

let testElement = {
  childNodes: [1,2,3]
}

let websiteWithHttp = 'http://somewebsite'
let websiteWithHttps = 'https://somewebsite'
let badWebsite = 'www.somewebsite'

console.log(
  `${testElement.childNodes[0]} ===`, getNthChild(testElement, 1)
)

console.log(
  'testing for http:', testForHttpPrefix(websiteWithHttp)
)

console.log(
  'testing for https:', testForHttpPrefix(websiteWithHttps)
)

console.log(
  'testing bad website:', testForHttpPrefix(badWebsite)
)

console.log(
  'returns false for a bad string:', testForHttpPrefix('')
)
