///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'
import orderForm from '../../../support/PageObject/orderForm'
import messages from '../../../support/PageObject/messages'
import ordersTable from '../../../support/PageObject/ordersTable'

When('I Select a currency', () => {
	tickers.selectTicker()
})

Then('A Sell Limit order from Exchange wallet should be created', () => {
	orderForm.selectExchangeWallet()
	orderForm.sellLimitOrder()
	messages.sellLimitConfirm()
})

Then('Filter should work', () => {
	ordersTable.orderFilterAskExch()
})

Then('A Sell Limit order from Exchange wallet should be cancelled', () => {
	ordersTable.cancelOrder()
	messages.cancelSellLimitOrder()
	ordersTable.clearFilters()
})
