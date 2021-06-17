///  <reference types="cypress"/>

import login from '../PageObject/login.js'
import stopLimitExch from '../PageObject/stopLimitExch.js'

const staging = new login()
const stopLmt = new stopLimitExch()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
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
