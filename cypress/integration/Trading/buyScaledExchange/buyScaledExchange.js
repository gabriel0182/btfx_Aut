///  <reference types="cypress"/>

import buyScaled from '../../../support/PageObject/buyScaled.js'

const buyScld = new buyScaled()

When('I type the order required info', () => {
	buyScld.trading()
	buyScld.verifyFields()
	buyScld.requiredFields()
	buyScld.orderInfo()
})

When('I select to Exchange Submit', () => {
	buyScld.submitButton()
})

Then('I verify the Scaled buy order from Exchange wallet was created', () => {
	buyScld.successMsg()
	buyScld.orderFilter()
	buyScld.sortingOrdersTable()
	buyScld.cancelOrder()
})
