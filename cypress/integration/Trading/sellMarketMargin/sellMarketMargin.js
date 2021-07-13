///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'
import orderForm from '../../../support/PageObject/orderForm'
import messages from '../../../support/PageObject/messages'

When('I Select a currency', () => {
	tickers.selectTicker()
	orderForm.selectMarketOrder()
})
Then('A sell Market order from Exchange wallet should be created', () => {
	orderForm.selectMarginWallet()
	orderForm.sellMarketOrder()
	messages.sellMarketConfirm()
})
