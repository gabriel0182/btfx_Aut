///  <reference types="cypress"/>

import login from '../PageObject/login.js'
import buyFillKill from '../PageObject/buyFillKill.js'
import quickTransfer from '../PageObject/quickTransfer.js'

const staging = new login()
const buyFK = new buyFillKill()
const transfer = new quickTransfer()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
	buyFK.trading()
})

When('I select the currency from the balance', () => {
	transfer.selectCurrency()
})

When('I select Source For USD Transfer', () => {
	transfer.selectSource()
})

When('I select Destination For USD Transfer', () => {
	transfer.selectDestination()
})

When('I type the amount and confirm the transaction', () => {
	transfer.tranferAmount()
})

Then('I verify the quick transfer was made', () => {
	transfer.successMsg()
})
