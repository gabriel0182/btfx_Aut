///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'
import orderForm from '../../../support/PageObject/orderForm'
import messages from '../../../support/PageObject/messages'
import ordersTable from '../../../support/PageObject/ordersTable'
import orderBook from '../../../support/PageObject/orderBook'

When('I Select a currency', () => {
	tickers.selectTicker()
})

Then('Limit order min-max price should work', () => {
	orderForm.selectLimitOrder()
	orderForm.validateMaxPrice()
	orderForm.validateMin()
	orderForm.validateMax()
})
Then('Limit order Exchange field should be shown', () => {
	orderForm.selectExchangeWallet()
	orderForm.verifyLimitExchangeFields()
})
Then('Limit order Margin field should be shown', () => {
	orderForm.selectMarginWallet()
	orderForm.verifyLimitMarginFields()
})

Then('Buy Limit order required field message should be shown', () => {
	orderForm.verifyLimitRequiredFields()
})

Then('A Buy Limit order from Exchange wallet should be created', () => {
	orderForm.buyLimitOrder()
	messages.buyLimitConfirm()
})

Then('A Buy Limit order green marker should be shown', () => {
	orderBook.validateMarkers()
})
Then('Filter should work', () => {
	ordersTable.orderFilterBidExch()
})
Then('A Buy Limit order from Exchange wallet should be cancelled', () => {
	ordersTable.cancelOrder()
	messages.cancelLimitOrder()
})
