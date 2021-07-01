///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import buyFillKill from '../../../support/PageObject/buyFillKill.js'
import quickTransfer from '../../../support/PageObject/quickTransfer.js'

const staging = new login()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
	buyFillKill.trading()
})

When('I select the currency from the balance', () => {
	quickTransfer.selectCurrency()
})

When('I select Source and Destination for USD Transfer', () => {
	quickTransfer.selectSource()
	quickTransfer.selectDestination()
})

Then('I transfer the amount and confirm the transaction', () => {
	quickTransfer.tranferAmount()
})
