

/*** PATH STUFF: ***/
let { pathname } = window.location
let businessPath = /\/businesses\/\d+$/
let editPath = /\/businesses\/\d+\/edit/
let logoPath = /\/businesses\/\d+\/logo/

/*** HELPER FUNCTIONS: ***/
let testPathname = pathname => re => re.test(pathname)
// testPath :: Regex -> Bool
let testPath = testPathname(pathname)
let getNthChild = (n, el) => el.childNodes[n - 1]

let applyBusinessPathStyles = () => {
  let mainContent = document.getElementById('content')
  let leftCol = document.querySelector('.left-col')
  let profileSettingsh4 = getNthChild(8, leftCol)
  let profileSettingsContent = getNthChild(10, leftCol)
  let editUrl = profileSettingsContent
      .childNodes[1]
      .childNodes[0]
      .href
			
  let editDiv = document.createElement('a')
  editDiv.text = 'Edit Business'
  editDiv.id = 'edit_div_custom'
  editDiv.href = editUrl
  mainContent.prepend(editDiv)
}
    

let applyLogoPathStyles = () => {
  let mpLogo = document.querySelector('.edit_business')
      .childNodes[5].childNodes[0]

  mpLogo.style.border = '1px solid lightgrey'
}

let applyEditPathStyles = () => {
  let websiteInput = document.querySelector('#business_website')
  let websiteUrl = websiteInput.value
  console.log(websiteUrl)
  

}
    
if (window.location.host === 'admin.austin.ownlocal.com') {
  if (testPath(businessPath)) {
    applyBusinessPathStyles()
  }
    
  if (testPath(editPath)) {
    applyEditPathStyles()
  }

  if(testPath(logoPath)) {
    applyLogoPathStyles()
  }
}
