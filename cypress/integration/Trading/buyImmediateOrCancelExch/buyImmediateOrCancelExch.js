///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import buyImmediateCancel from '../../../support/PageObject/buyImmediateCancel.js'

const buyIC = new buyImmediateCancel()

Given('I go to Trading page', () => {
	login.landing()
	login.longIn()
	buyIC.trading()
})

When('I type the order required info', () => {
	buyIC.verifyFields()
	buyIC.requiredFields()
	buyIC.orderInfo()
})

When('I select to Exchange Buy', () => {
	buyIC.buyButton()
})

Then('I verify the Immediate or Cancel buy order from Exchange wallet was created', () => {
	buyIC.successMsg()
})
