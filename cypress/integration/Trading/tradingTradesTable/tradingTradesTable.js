///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers.js'
import trades from '../../../support/PageObject/trades.js'
import orderHistory from '../../../support/PageObject/orderHistory.js'

When('I Select a currency', () => {
	tickers.selectTicker()
})

When('The sorting order History table should work', () => {
	orderHistory.sortingOrderHistory()
})

Then('The trading table Market should work', () => {
	trades.validateMarket()
})

Then('The trading table yours should work', () => {
	trades.validateYours()
})
