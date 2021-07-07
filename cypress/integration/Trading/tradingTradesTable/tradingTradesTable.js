///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import TradesTable from '../../../support/PageObject/TradesTable.js'
import trading from '../../../support/PageObject/trading.js'


Given('I went to the Trading page', () => {
	login.landing()
	login.longIn()
})

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
