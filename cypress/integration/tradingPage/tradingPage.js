///  <reference types="cypress"/>

import login from '../PageObject/login.js'
import trading from '../PageObject/trading.js'

const staging = new login()
const trd = new trading()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
})

When('I Select a currency', () => {
	trd.currency()
})

Then('I verify the graph is shown', () => {
	trd.verifyCurrency()
})

Then('I verify the Order from best bid / ask', () => {
	trd.checkBestValue()
})

Then('I verify the Order form max buy / sell', () => {
	trd.checkMaxValue()
})

Then('I verify the alerts in order book table', () => {
	trd.addAlert()
})

Then('I verify the order book precision and aggregation', () => {
	trd.bookZoomAdd()
	trd.bookZoomReduce()
	trd.increaseDecreasePrecision()
})
