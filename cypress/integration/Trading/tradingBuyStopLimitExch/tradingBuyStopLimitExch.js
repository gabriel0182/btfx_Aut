///  <reference types="cypress"/>

import stopLimitExch from '../../../support/PageObject/stopLimitExch.js'

const stopLmt = new stopLimitExch()

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
