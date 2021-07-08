///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import limitSellExch from '../../../support/PageObject/limitSellExch.js'
import buyLimitExch from '../../../support/PageObject/buyLimitExch.js'

const limitSell = new limitSellExch()
const limitBuy = new buyLimitExch()

Given('I go to Trading page', () => {
	login.landing()
	login.longIn()
	limitSell.trading()
})

When('I type the order required info', () => {
	limitBuy.verifyFields()
	limitSell.requiredFields()
	limitSell.validateMin()
	limitSell.validateMax()
	limitSell.orderInfo()
})

When('I select to Exchange sell', () => {
	limitSell.sellButton()
})

Then('I verify the limit sell order was created', () => {
	limitSell.successMsg()
	limitSell.orderFilter()
	limitSell.cancelSellOrder()
})
