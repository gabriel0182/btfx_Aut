///  <reference types="cypress"/>

import buyFillKill from '../../../support/PageObject/buyFillKill.js'
import quickTransfer from '../../../support/PageObject/quickTransfer.js'

Given('Trading view is visible', () => {
	buyFillKill.trading()
})

When('I select the currency from the balance', () => {
	quickTransfer.selectCurrency()
})

And('I select Source and Destination for USD Transfer', () => {
	quickTransfer.selectSource()
	quickTransfer.selectDestination()
})

Then('I transfer the amount and confirm the transaction', () => {
	quickTransfer.tranferAmount()
})
