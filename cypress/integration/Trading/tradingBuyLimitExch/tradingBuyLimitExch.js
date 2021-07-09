///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'
import orderForm from '../../../support/PageObject/orderForm'

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
	/*
	limitExch.orderInfo()*/
})

When('I select to Exchange Buy', () => {
	//limitExch.buyButton()
})

Then('I verify the limit order was created', () => {
	/*limitExch.successMsg()
	limitExch.orderFilter()
	limitExch.validateMarkers()
	limitExch.cancelOrder()*/
})
