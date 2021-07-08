///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import buyStopTIF from '../../../support/PageObject/buyStopTIF.js'
import buyStop from '../../../support/PageObject/buyStop.js'

const stopTIF = new buyStopTIF()
const stopBuy = new buyStop()

Given('I go to Trading page', () => {
	login.landing()
	login.longIn()
	stopTIF.trading()
})

When('I type the order required info', () => {
	stopTIF.verifyFields()
	stopBuy.requiredFields()
	stopTIF.orderInfo()
})

When('I select to Exchange Buy', () => {
	stopTIF.buyButton()
})

Then('I verify the stop order with TIF from Margin wallet was created', () => {
	stopTIF.successMsg()
	stopTIF.orderFilter()
	stopTIF.verifyTIF()
	stopTIF.cancelOrder()
})
