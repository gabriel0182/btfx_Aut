///  <reference types="cypress"/>

import orderForm from '../../../support/PageObject/orderForm'
import messages from '../../../support/PageObject/messages'
import ordersTable from '../../../support/PageObject/ordersTable'

Then('A Buy Stop order from Exchange wallet should be created', () => {
	orderForm.selectStopOrder()
	orderForm.selectExchangeTab()
	orderForm.buyStopOrder()
	messages.buyStopConfirm()
})

Then('A Buy Stop order from Exchange wallet should be cancelled', () => {
	ordersTable.orderFilterBidExch()
	ordersTable.cancelOrder()
	messages.cancelBuyStopOrder()
})