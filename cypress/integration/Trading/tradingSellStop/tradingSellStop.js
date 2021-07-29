///  <reference types="cypress"/>

import orderForm from '../../../support/PageObject/orderForm'
import messages from '../../../support/PageObject/messages'
import ordersTable from '../../../support/PageObject/ordersTable'

Then('A Sell Stop order from Exchange wallet should be created', () => {
	orderForm.selectStopOrder()
	orderForm.selectExchangeWallet()
	orderForm.sellStopOrder()
	messages.sellStopConfirm()
})

Then('Filter should work', () => {
	ordersTable.orderFilterAskExch()
})
Then('A Sell Stop order from Exchange wallet should be cancelled', () => {
	ordersTable.cancelOrder()
	messages.cancelSellStopOrder()
})

/*
When('I type the order required info', () => {
	stop.verifyFields()
	stop.requiredFields()
	stop.validateMin()
	stop.validateMax()
	stop.orderInfo()
})
})*/
