///  <reference types="cypress"/>

import orderForm from '../../../support/PageObject/orderForm'
import trades from '../../../support/PageObject/trades'

When('I select {string} order', (orderType) => {
	orderForm.selectOrderType(orderType)
})

And('I place an Exchange Market Buy order', () => {
	orderForm.buyMarketOrder()
})

Then('A row is added to the Trades table', () => {
	trades.addedMarketRow()
})

Then('It has a green background colour', () => {
	trades.rowGreenBackgroundColour()
})

Then('It contains the trade amount', () => {
	trades.getTradeAmount()
})

Then('It contains the trade price', () => {
	trades.getTradePrice()
})

Then('it contains the trade time', () => {
	trades.getTradeTime()
})

Then('It contains a green up icon', () => {
	trades.greenUpIcon()
})
