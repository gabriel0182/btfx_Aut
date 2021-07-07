///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import stopLimitExch from '../../../support/PageObject/stopLimitExch.js'

const stopLmt = new stopLimitExch()

Given('I go to Trading page', () => {
	login.landing()
	login.longIn()
	stopLmt.trading()
})

When('I type the order required info', () => {
	stopLmt.verifyFields()
	stopLmt.requiredFields()
	stopLmt.validateMin()
	stopLmt.validateMax()
	stopLmt.orderInfo()
})

When('I select to Exchange Buy from Exchange wallet', () => {
	stopLmt.buyButton()
})

Then('I verify the stop limit order was created', () => {
	stopLmt.successMsg()
	stopLmt.orderFilter()
	stopLmt.validateHidden()
	stopLmt.cancelOrder()
})
