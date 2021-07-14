///  <reference types="cypress"/>

import sellStopLimitExch from '../../../support/PageObject/sellStopLimitExch.js'
import stopLimitExch from '../../../support/PageObject/stopLimitExch.js'

const sellstopLmt = new sellStopLimitExch()
const stopLmt = new stopLimitExch()

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
