///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import TradesTable from '../../../support/PageObject/TradesTable.js'
import trading from '../../../support/PageObject/trading.js'
import sellScaled from '../../../support/PageObject/sellScaled.js'

const staging = new login()
const trades = new TradesTable()
const trd = new trading()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
})

When('I Select a currency', () => {
	trd.currency()
})

When('Test table sorting in all areas', () => {
	trades.sortingOrderHistory()
})

Then('I verify the trading table Market', () => {
	trades.validateMarket()
})

Then('I verify the trading table yours', () => {
	trades.validateYours()
})