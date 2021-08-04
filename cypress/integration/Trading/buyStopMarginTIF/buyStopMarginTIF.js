///  <reference types="cypress"/>

import buyStopTIF from '../../../support/PageObject/buyStopTIF.js'
import buyStop from '../../../support/PageObject/buyStop.js'

const stopTIF = new buyStopTIF()
const stopBuy = new buyStop()

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
