///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import trading from '../../../support/PageObject/trading.js'

const staging = new login()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
})

When('I Select a currency', () => {
	trading.currency()
})

Then('I verify the graph is shown', () => {
	trading.verifyCurrency()
})

Then('I verify the Order form max buy / sell', () => {
	trading.checkMaxValue()
})

Then('I verify the Order from best bid / ask', () => {
	trading.checkBestValue()
})

Then('I verify the alerts in order book table', () => {
	trading.addAlert()
})

Then('I verify the order book precision and aggregation', () => {
	trading.bookZoomAdd()
	trading.bookZoomReduce()
	trading.increaseDecreasePrecision()
})
