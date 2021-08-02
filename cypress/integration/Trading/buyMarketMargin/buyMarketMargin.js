///  <reference types="cypress"/>

import orderForm from '../../../support/PageObject/orderForm'
import messages from '../../../support/PageObject/messages'
import positions from '../../../support/PageObject/positions'

And('I place a Margin Market Order', () => {
	orderForm.selectMarketOrder()
})
Then('A long margin position is opened', () => {
	orderForm.selectMarginWallet()
	orderForm.buyMarketOrder()
	messages.buyMarketConfirm()
})

Then('A Buy Market order from Exchange wallet should be cancelled', () => {
	positions.cancelPosition()
	messages.cancelBuyMarketOrder()
})
