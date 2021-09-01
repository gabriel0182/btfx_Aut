///  <reference types="cypress"/>

import buyImmediateCancel from '../../../support/PageObject/buyImmediateCancel.js'
import sellImmediateCancel from '../../../support/PageObject/sellImmediateCancel.js'

const buyIC = new buyImmediateCancel()
const sellIC = new sellImmediateCancel()

When('I type the order required info', () => {
	buyIC.verifyFields()
	sellIC.requiredFields()
	sellIC.orderInfo()
})

When('I select to Exchange Sell', () => {
	sellIC.sellButton()
})

Then('I verify the Immediate or Cancel sell order from Exchange wallet was created', () => {
	sellIC.successMsg()
})
