///  <reference types="cypress"/>

import orderform from '../../../support/PageObject/orderForm'

Then('The Order Form contains an Exchange tab', () => {
	orderform.exchangeTabIsVisible()
})

And('The Order Form contains a Margin tab', () => {
	orderform.marginTabIsVisible()
})

And('The Order Form does not contain a Margin tab', () => {
	orderform.marginTabIsNotVisible()
})
