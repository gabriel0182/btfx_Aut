///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import buyStop from '../../../support/PageObject/buyStop.js'
import buyLimitExch from '../../../support/PageObject/buyLimitExch.js'

const staging = new login()
const stop = new buyStop()
const buyLimit = new buyLimitExch()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
	stop.trading()
})

When('I type the order required info', () => {
	stop.verifyFields()
	stop.requiredFields()
	stop.validateMin()
	stop.validateMax()
	stop.orderInfo()
})

When('I select to Exchange Buy', () => {
	stop.buyButton()
})

Then('I verify the stop order was created', () => {
	stop.successMsg()
	buyLimit.orderFilter()
	stop.cancelOrder()
})
