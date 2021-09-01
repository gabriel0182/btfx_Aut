///  <reference types="cypress"/>

import sellScaled from '../../../support/PageObject/sellScaled.js'
import buyScaled from '../../../support/PageObject/buyScaled.js'

const buyScld = new buyScaled()
const sellScld = new sellScaled()

When('I type the order required info', () => {
	buyScld.trading()
	buyScld.verifyFields()
	sellScld.requiredFields()
	sellScld.orderInfo()
})

When('I select to Exchange Submit', () => {
	sellScld.submitButton()
})

Then('I verify the Scaled sell order from Exchange wallet was created', () => {
	sellScld.successMsg()
	sellScld.orderFilter()
	sellScld.cancelOrder()
	sellScld.cleanFilters()
})
