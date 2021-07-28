///  <reference types="cypress"/>

import sellStop from '../../../support/PageObject/sellStop'
import buyStop from '../../../support/PageObject/buyStop'
import limitSellExch from '../../../support/PageObject/sellStopLimitExch'

const stopSell = new sellStop()
const stopBuy = new buyStop()
const limitSell = new limitSellExch()

When('I type the order required info', () => {
	stopBuy.verifyFields()
	stopSell.requiredFields()
	stopSell.validateMin()
	stopSell.validateMax()
	stopSell.orderInfo()
})

When('I select to Exchange sell', () => {
	stopSell.sellButton()
})

Then('I verify the stop order was created', () => {
	stopSell.successMsg()
	limitSell.orderFilter()
	stopSell.cancelSellOrder()
})
