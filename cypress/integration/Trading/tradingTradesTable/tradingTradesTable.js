///  <reference types="cypress"/>

import TradesTable from '../../../support/PageObject/TradesTable.js'
import trading from '../../../support/PageObject/trading.js'
import sellScaled from '../../../support/PageObject/sellScaled.js'

const trades = new TradesTable()
const trd = new trading()

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
