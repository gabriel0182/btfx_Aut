///  <reference types="cypress"/>

import orderForm from '../../../support/PageObject/orderForm'
import messages from '../../../support/PageObject/messages'
import positions from '../../../support/PageObject/positions'

And('I select the market order', () => {
	orderForm.selectMarketOrder()
})
Then('A Buy Market order from Exchange wallet should be created', () => {
	orderForm.selectMarginWallet()
	orderForm.buyMarketOrder()
	messages.buyMarketConfirm()
})

Then('A Buy Market order from Exchange wallet should be cancelled', () => {
	positions.cancelPosition()
	messages.cancelBuyMarketOrder()
})
