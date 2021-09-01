///  <reference types="cypress"/>

import orderForm from '../../../support/PageObject/orderForm'

Then('Limit order min-max price should work', () => {
	orderForm.selectOrderType('Limit')
	orderForm.validateMaxPrice()
	orderForm.validateMin()
	orderForm.validateMax()
})
Then('I verify the highest bid', () => {
	orderForm.setPriceToHighestBid()
	orderForm.checkHighestBid()
})

Then('I verify the lowest ask', () => {
	orderForm.setPriceToLowestAsk()
	orderForm.checkLowestAsk()
})

Then('I verify the Order form max buy / sell', () => {
	orderForm.checkMaxValue()
})
Then('Limit order Exchange field should be shown', () => {
	orderForm.selectExchangeWallet()
	orderForm.verifyLimitExchangeFields()
})
Then('Limit order Margin field should be shown', () => {
	orderForm.selectMarginWallet()
	orderForm.verifyLimitMarginFields()
})
Then('Buy Limit order required field message should be shown', () => {
	orderForm.verifyLimitRequiredFields()
	orderForm.verifySellLimitRequiredFields()
})
