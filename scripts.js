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



// ROUTE: http://admin.austin.ownlocal.com/mch/publishers/<pub_id>/invoices/<inv_id>

function deleteLineItems() {

  let products = []
  let trs = document.querySelectorAll("tr")
  let deletedCount = 0
  let deletedIds = []
  
  trs.forEach(tr => {
    let product = tr.children[1]
    if (product.innerText === "Featured Level AdForge") {
      products.push(product)
    }
  })
  
  products.forEach(product => {
    let row = product.parentElement
    let descriptionTd = row.children[2]
    let businessTd    = row.children[3]
    let removeTd      = row.children[7]
    let unitCost      = row.children[4].innerText
    let lineTotal     = row.children[6].innerText
    
    let price = "$5.00"
    // hasAds: TRUE if any child of businessTd's innerText starts with "Ads"
    let hasAds = false
    let costsFive = (unitCost === price && lineTotal === price) ? true : false
    
    /*** DOM MUTATIONS ***/
    businessTd.children.forEach = Array.prototype.forEach
    businessTd.children.forEach(child => {
      if(child.innerText.startsWith("Ads:")) {
	hasAds = true
      }
    })
    
    if (hasAds) {
      product.style.color = "green"
      // DON'T DELETE! return instead
      return
    }
    
    if (!costsFive) {
      product.style.color = "yellow"
      // DON'T DELETE! return instead
      return
    }
    
    if (descriptionTd.innerText === "") {
      // DELETE THIS LINE ITEM!
      product.style.color = "red"
      // get ID from end of href:
      let id = removeTd.children[1].href.split("/").reverse()[0]
      
      /*** ACTUALLY DELETE ITEM! ***/
      removeTd.children[1].click()
      
      deletedCount = deletedCount + 1
      console.log(`DELETED LINE ITEM #${deletedCount}; ID: ${id}`)
    }
    
  })
}

// deleteLineItems()
