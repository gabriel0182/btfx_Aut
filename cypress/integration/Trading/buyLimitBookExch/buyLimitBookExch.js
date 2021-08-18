///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'
import orderForm from '../../../support/PageObject/orderForm'
import buyLimitBook from '../../../support/PageObject/buyLimitBook.js'

const limitBk = new buyLimitBook()

And('I select the market order', () => {
	orderForm.selectOrderType('Market')
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
