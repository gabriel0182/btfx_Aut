///  <reference types="cypress"/>

import trades from '../../../../support/PageObject/trades.js'
import orderHistory from '../../../../support/PageObject/orderHistory.js'

When('The sorting order History table should work', () => {
	orderHistory.sortingOrderHistory()
})

Then('The trading table Market should work', () => {
	trades.validateMarket()
})

Then('The trading table yours should work', () => {
	trades.validateYours()
})
