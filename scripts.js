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
let testForHttpPrefix = url => {
  let re = /^https?:\/\//
  return re.test(url)
}

let applyAdminPathStyles = () => {
  
}

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
	let mpLogo = document.querySelectorAll('img')[1]
  mpLogo.style.border = '1px solid lightgrey'
}

let applyEditPathBehavior = () => {
  let websiteInput = document.querySelector('#business_website')
  let mainContent = document.querySelector('#content')
  let websiteUrl = websiteInput.value
  let iFrameWindow,
      aboutContent

  window.addEventListener('load', () => {
    iFrameWindow = document.querySelector('.cke_wysiwyg_frame').contentWindow

    iFrameWindow.document.body.addEventListener('load', () => console.log('loaded!'))
		
  })

	
  if (websiteUrl && !testForHttpPrefix(websiteUrl)) {
    let errorDiv = document.createElement('a')
    errorDiv.text = 'Bad Website!'
    errorDiv.id = 'bad_website_custom'
    errorDiv.addEventListener(
      'click',
      () => window.open(`http://${websiteUrl}`, '_blank')
    )

    mainContent.prepend(errorDiv)
  }
}

    
if (window.location.host === 'admin.austin.ownlocal.com') {
  if (testPath(businessPath)) {
    applyBusinessPathStyles()
  }
    
  if (testPath(editPath)) {
    applyEditPathBehavior()
  }

  if(testPath(logoPath)) {
    applyLogoPathStyles()
  }
}

