///  <reference types="cypress"/>

import trailingStopExch from '../../../support/PageObject/trailingStopExch.js'

const trailingStop = new trailingStopExch()

When('I type the order required info', () => {
	trailingStop.verifyFields()
	trailingStop.requiredFields()
	trailingStop.orderInfo()
})

When('I select to Exchange Buy', () => {
	trailingStop.buyButton()
})

Then('I verify the Trailing Stop buy order from Exchange wallet was created', () => {
	trailingStop.successMsg()
	trailingStop.orderFilter()
	trailingStop.cancelOrder()
})
