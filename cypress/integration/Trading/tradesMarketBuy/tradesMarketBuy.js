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

Then('It has a {string} background colour', (color) => {
	trades.validateRowBackgroundColor(color) 
})

Then('It contains the trade amount', () => {
	trades.containsTradeAmount()
})

Then('It contains the trade price', () => {
	trades.containsTradeBuyPrice()
})

Then('it contains the trade time', () => {
	trades.containsTradeTime()
})

Then('It contains a {string} {string} icon', (iconColor,icon) => {
	trades.validateTradeUpDownIcon(iconColor,icon)
})

