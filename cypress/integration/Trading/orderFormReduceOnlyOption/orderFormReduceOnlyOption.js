///  <reference types="cypress"/>

import orderform from '../../../support/PageObject/orderForm'

When('The selected order form tab is Exchange', () => {
	orderform.selectExchangeTab()
})

Then('The Order Form does not contain the {string} tickbox', (orderFormOption) => {
	orderform.orderFormOptionIsNotVisible(orderFormOption)
})

When('The selected order form tab is Margin', () => {
	orderform.selectMarginTab()
})

Then('The Order Form contains the {string} tickbox', (orderFormOption) => {
	orderform.orderFormOptionIsVisible(orderFormOption)
})
