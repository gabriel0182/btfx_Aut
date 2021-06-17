///  <reference types="cypress"/>

import login from '../PageObject/login.js'
import sellStop from '../PageObject/sellStop.js'
import buyStop from '../PageObject/buyStop.js'
import limitSellExch from '../PageObject/limitSellExch.js'

const staging = new login()
const stopSell = new sellStop()
const stopBuy = new buyStop()
const limitSell = new limitSellExch()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
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
