///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import buyMarket from '../../../support/PageObject/buyMarket.js'

const buyMk = new buyMarket()

Given('I go to Trading page', () => {
	login.landing()
	login.longIn()
	buyMk.trading()
})

When('I type the order required info', () => {
	buyMk.verifyFields()
	buyMk.requiredFields()
	buyMk.validateMin()
	buyMk.validateMax()
	buyMk.orderInfo()
})

When('I select to Margin Buy', () => {
	buyMk.buyButton()
})

Then('I verify the Market buy order from Margin wallet was created', () => {
	buyMk.successMsg()
	buyMk.cancelPosition()
})
