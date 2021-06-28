///  <reference types="cypress"/>

import login from '../PageObject/login.js'
import buyLimitExch from '../PageObject/buyLimitExch.js'

const staging = new login()
const limitExch = new buyLimitExch()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
	limitExch.trading()
})

When('I type the order required info', () => {
	limitExch.verifyFields()
	limitExch.requiredFields()
	limitExch.validateMin()
	limitExch.validatePriceSet()
	limitExch.validateMax()
	limitExch.orderInfo()
})

When('I select to Exchange Buy', () => {
	limitExch.buyButton()
})

Then('I verify the limit order was created', () => {
	limitExch.successMsg()
	limitExch.orderFilter()
	limitExch.validateMarkers()
	limitExch.cancelOrder()
})
