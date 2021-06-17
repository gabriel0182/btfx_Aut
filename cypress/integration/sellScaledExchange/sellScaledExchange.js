///  <reference types="cypress"/>

import login from '../PageObject/login.js'
import sellScaled from '../PageObject/sellScaled.js'
import buyScaled from '../PageObject/buyScaled.js'

const staging = new login()
const buyScld = new buyScaled()
const sellScld = new sellScaled()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
})

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
