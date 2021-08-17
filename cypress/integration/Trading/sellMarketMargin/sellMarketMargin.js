///  <reference types="cypress"/>

import orderForm from '../../../support/PageObject/orderForm'
import messages from '../../../support/PageObject/messages'

And('I select market order', () => {
	orderForm.selectOrderType('Market')
})
Then('A sell Market order from Exchange wallet should be created', () => {
	orderForm.selectMarginWallet()
	orderForm.sellMarketOrder()
	messages.sellMarketConfirm()
})
