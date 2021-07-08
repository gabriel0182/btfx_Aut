///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import sellStopLimitExch from '../../../support/PageObject/sellStopLimitExch.js'
import stopLimitExch from '../../../support/PageObject/stopLimitExch.js'

const sellstopLmt = new sellStopLimitExch()
const stopLmt = new stopLimitExch()

Given('I go to Trading page', () => {
	login.landing()
	login.longIn()
	sellstopLmt.trading()
})

When('I type the order required info', () => {
	stopLmt.verifyFields()
	sellstopLmt.requiredFields()
	sellstopLmt.orderInfo()
})

When('I select to Exchange sell from Exchange wallet', () => {
	sellstopLmt.sellButton()
})

Then('I verify the stop limit order was created', () => {
	sellstopLmt.successMsg()
	sellstopLmt.orderFilter()
	sellstopLmt.cancelOrder()
})
