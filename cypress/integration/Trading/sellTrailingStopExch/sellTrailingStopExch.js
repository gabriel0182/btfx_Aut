///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import trailingStopSellExch from '../../../support/PageObject/trailingStopSellExch.js'
import trailingStopExch from '../../../support/PageObject/trailingStopExch.js'

const staging = new login()
const sellTrailingStop = new trailingStopSellExch()
const trailingStop = new trailingStopExch()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
	sellTrailingStop.trading()
})

When('I type the order required info', () => {
	trailingStop.verifyFields()
	sellTrailingStop.requiredFields()
	sellTrailingStop.orderInfo()
})

When('I select to Exchange Sell', () => {
	sellTrailingStop.sellButton()
})

Then('I verify the Trailing Stop sell order from Exchange wallet was created', () => {
	sellTrailingStop.successMsg()
	sellTrailingStop.orderFilter()
	sellTrailingStop.cancelOrder()
})
