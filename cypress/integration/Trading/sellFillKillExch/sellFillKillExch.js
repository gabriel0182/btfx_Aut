///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import sellFillKill from '../../../support/PageObject/sellFillKill.js'
import buyFillKill from '../../../support/PageObject/buyFillKill.js'

const sellFK = new sellFillKill()
const buyFK = new buyFillKill()

Given('I go to Trading page', () => {
	login.landing()
	login.longIn()
	sellFK.trading()
})

When('I type the order required info', () => {
	buyFK.verifyFields()
	sellFK.requiredFields()
	sellFK.orderInfo()
})

When('I select to Exchange Sell', () => {
	sellFK.sellButton()
})

Then('I verify the Fill or Kill sell order from Exchange wallet was created', () => {
	sellFK.successMsg()
})
