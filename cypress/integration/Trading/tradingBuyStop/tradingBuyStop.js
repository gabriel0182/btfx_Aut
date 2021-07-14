///  <reference types="cypress"/>

import buyStop from '../../../support/PageObject/buyStop.js'
import buyLimitExch from '../../../support/PageObject/buyLimitExch.js'

const stop = new buyStop()
const buyLimit = new buyLimitExch()

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
})
