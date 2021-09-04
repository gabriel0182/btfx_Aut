///  <reference types="cypress"/>

import orderform from '../../../support/PageObject/orderForm'
import orderForm from '../../../support/PageObject/orderForm'

And('The selected order form tab is Exchange', () => {
	orderForm.selectExchangeTab()
})

When('I select the {string} Order type', (orderType) => {
	orderForm.selectOrderType(orderType)
})

Then('The order form Price input is disabled', () => {
	orderform.priceInputIsDisabled()
})

And('The order form Price input contains the text {string}', (text) => {
	orderform.priceInputContains(text)
})
