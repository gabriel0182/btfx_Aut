///  <reference types="cypress"/>

import buyImmediateCancel from '../../../support/PageObject/buyImmediateCancel.js'

const buyIC = new buyImmediateCancel()

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
