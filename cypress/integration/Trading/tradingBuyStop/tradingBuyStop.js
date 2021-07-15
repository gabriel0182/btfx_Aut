///  <reference types="cypress"/>

import orderForm from '../../../support/PageObject/orderForm'
import messages from '../../../support/PageObject/messages'
import ordersTable from '../../../support/PageObject/ordersTable'

Then('A Buy Stop order from Exchange wallet should be created', () => {
	orderForm.selectStopOrder()
	orderForm.selectExchangeWallet()
	orderForm.buyStopOrder()
	messages.buyStopConfirm()
})

Then('A Buy Stop order from Exchange wallet should be cancelled', () => {
	ordersTable.cancelOrder()
	messages.cancelBuyStopOrder()
})

/*
When('I type the order required info', () => {
	stop.verifyFields()
	stop.requiredFields()
	stop.validateMin()
	stop.validateMax()
	stop.orderInfo()
})

When('I select to Exchange Buy', () => {
	stop.buyButton()
})

Then('I verify the stop order was created', () => {
	stop.successMsg()
	buyLimit.orderFilter()
	stop.cancelOrder()
})*/
