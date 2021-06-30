///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import buyFillKill from '../../../support/PageObject/buyFillKill.js'

const staging = new login()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
	buyFillKill.trading()
})

When('I type the order required info', () => {
	buyFillKill.verifyFields()
	buyFillKill.requiredFields()
	buyFillKill.orderInfo()
})

When('I select to Exchange Buy', () => {
	buyFillKill.buyButton()
})

Then('I verify the Fill or Kill buy order from Exchange wallet was created', () => {
	buyFillKill.successMsg()
})
