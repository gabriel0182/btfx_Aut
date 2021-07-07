///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import buyLimitBook from '../../../support/PageObject/buyLimitBook.js'

const limitBk = new buyLimitBook()

Given('I go to Trading page', () => {
	login.landing()
	login.longIn()
	limitBk.trading()
})

When('I type the order required info', () => {
	limitBk.verifyFields()
	limitBk.requiredFields()
	limitBk.orderInfo()
})

When('I select and order from the book', () => {
	limitBk.selectField()
})

Then('I verify the Limit Order Book buy order from Exchange wallet was created', () => {
	limitBk.successMsg()
})
