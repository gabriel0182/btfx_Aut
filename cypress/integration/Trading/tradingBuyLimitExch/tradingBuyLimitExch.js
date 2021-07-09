///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'
import orderForm from '../../../support/PageObject/orderForm'
import messages from '../../../support/PageObject/messages'

When('I Select a currency', () => {
	tickers.selectTicker()
})

When('I type the order required info', () => {
	orderForm.selectLimitOrder()
	orderForm.selectExchangeWallet()
	orderForm.verifyLimitExchangeFields()
	orderForm.selectMarginWallet()
	orderForm.verifyLimitMarginFields()
	orderForm.verifyLimitRequiredFields()
	orderForm.validateMin()
	orderForm.validateMax()
	orderForm.validateMaxPrice()
})

When('I select to Exchange Buy', () => {
	orderForm.buyLimitOrder()
})

Then('I verify the limit order was created', () => {
	messages.buyLimitConfirm()
	/*limitExch.orderFilter()
	limitExch.validateMarkers()
	limitExch.cancelOrder()*/
})
