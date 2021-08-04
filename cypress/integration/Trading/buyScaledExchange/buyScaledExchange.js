///  <reference types="cypress"/>

import buyScaled from '../../../support/PageObject/buyScaled.js'

const buyScld = new buyScaled()

When('I type the order required info', () => {
	buyScld.trading()
	buyScld.verifyFields()
	buyScld.requiredFields()
	buyScld.orderInfo()
})

When('I submit the Buy order', () => {
	buyScld.submitButton()
})

Then('The Exchange Scaled Buy orders are created', () => {
	buyScld.successMsg()
	buyScld.orderFilter()
	buyScld.sortingOrdersTable()
	buyScld.cancelOrder()
})
