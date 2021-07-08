///  <reference types="cypress"/>

import TradesTable from '../../../support/PageObject/TradesTable.js'
import trading from '../../../support/PageObject/trading.js'

When('I Select a currency', () => {
	trading.currency()
})

When('The sorting order History table should work', () => {
	TradesTable.sortingOrderHistory()
})

Then('The trading table Market should work', () => {
	TradesTable.validateMarket()
})

Then('The trading table yours should work', () => {
	TradesTable.validateYours()
})
