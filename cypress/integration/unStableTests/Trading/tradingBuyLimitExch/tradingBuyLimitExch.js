///  <reference types="cypress"/>

import orderForm from '../../../support/PageObject/orderForm'
import messages from '../../../support/PageObject/messages'
import ordersTable from '../../../support/PageObject/ordersTable'
import orderBook from '../../../support/PageObject/orderBook'

Then('A Buy Limit order from Exchange wallet should be created', () => {
	orderForm.selectOrderType('Limit')
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
