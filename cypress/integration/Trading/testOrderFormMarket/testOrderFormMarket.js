///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'
import orderForm from '../../../support/PageObject/orderForm'

When('I Select a currency', () => {
	tickers.selectTicker()
})
Then('I verify the Order from best bid / ask', () => {
	orderForm.selectMarketOrder()
	orderForm.checkMaxMarketValue()
})

Then('Market order Margin field should be shown', () => {
	orderForm.selectMarginWallet()
	orderForm.verifyMarketMarginFields()
})
Then('Buy and  sell Market order required field message should be shown', () => {
	orderForm.verifyMarketRequiredFields()
})
Then('I verify the Order form max buy / sell', () => {
	orderForm.validateMaxMarket()
})
Then('I verify the Order form min buy / sell', () => {
	orderForm.validateMinMarket()
})
