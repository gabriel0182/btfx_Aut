///  <reference types="cypress"/>

import buyMarket from '../../../support/PageObject/buyMarket.js'
import sellMarket from '../../../support/PageObject/sellMarket.js'

const buyMk = new buyMarket()
const sellMk = new sellMarket()

When('I type the order required info', () => {
	buyMk.verifyFields()
	sellMk.requiredFields()
	sellMk.validateMin()
	sellMk.validateMax()
	sellMk.orderInfo()
})

When('I select to Margin Sell', () => {
	sellMk.sellButton()
})

Then('I verify the Market sell order from Margin wallet was created', () => {
	sellMk.successMsg()
	sellMk.orderFilter()
	sellMk.cancelPosition()
})
