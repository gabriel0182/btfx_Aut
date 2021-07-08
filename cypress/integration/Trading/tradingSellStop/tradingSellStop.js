///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import sellStop from '../../../support/PageObject/sellStop.js'
import buyStop from '../../../support/PageObject/buyStop.js'
import limitSellExch from '../../../support/PageObject/limitSellExch.js'

const stopSell = new sellStop()
const stopBuy = new buyStop()
const limitSell = new limitSellExch()

Given('I go to Trading page', () => {
	login.landing()
	login.longIn()
	stopSell.trading()
})

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
