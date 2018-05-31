
if (window.location.host === 'admin.austin.ownlocal.com') {

  /*** PATH STUFF: ***/
  let { pathname } = window.location
  let businessPath = /\/businesses\/\d+$/
  let logoPath = /\/businesses\/\d+\/logo/

  /*** HELPER FUNCTIONS: ***/
  let firstChild = el => el.childNodes[0]
  let testPathname = pathname => re => re.test(pathname)
  // testPath :: Regex -> Bool
  let testPath = testPathname(pathname)
    
  let applyBusinessPathStyles = () => {
    let mainContent = document.getElementById('content')
    let leftCol = document.querySelector('.left-col')
    let profileSettingsh4 = leftCol.childNodes[7]
    let profileSettingsContent = leftCol.childNodes[9]
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
    
  if (testPath(businessPath)) {
    applyBusinessPathStyles()
  }
    
  if(testPath(logoPath)) {
    applyLogoPathStyles()
  }
}
