///  <reference types="cypress"/>

import orderForm from '../../../support/PageObject/orderForm'
import messages from '../../../support/PageObject/messages'
import positions from '../../../support/PageObject/positions'

And('I select a Market Order type', () => {
	orderForm.selectOrderType('Market')
})
When('A long margin position is opened', () => {
	orderForm.selectMarginWallet()
	orderForm.buyMarketOrder()
})

Then('I receive a notification that the position has opened', () => {
	messages.buyMarketConfirm()
})

When('I click on a positions close button', () => {
	positions.cancelPosition()
})

Then('I receive a notification that the position has closed', () => {
	messages.cancelBuyMarketOrder()
})
