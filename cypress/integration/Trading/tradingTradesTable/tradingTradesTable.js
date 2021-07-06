///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import TradesTable from '../../../support/PageObject/TradesTable.js'
import trading from '../../../support/PageObject/trading.js'


Given('I go to Trading page', () => {
	login.landing()
	login.longIn()
})

When('I Select a currency', () => {
	trading.currency()
})

When('Test table sorting in all areas', () => {
	TradesTable.sortingOrderHistory()
})

Then('I verify the trading table Market', () => {
	TradesTable.validateMarket()
})

Then('I verify the trading table yours', () => {
	TradesTable.validateYours()
})
