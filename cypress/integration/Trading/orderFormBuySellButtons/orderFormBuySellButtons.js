///  <reference types="cypress"/>

import orderform from '../../../support/PageObject/orderForm'

When('The selected order form tab is Exchange', () => {
	orderform.selectExchangeTab()
})

Then('The Order Form Buy button contains the text {string}', (textButton) => {
	orderform.buyButtonContains(textButton)
})

And('The Order Form Sell button contains the text {string}', (textButton) => {
	orderform.sellButtonContains(textButton)
})

When('The selected order form tab is Margin', () => {
	orderform.selectMarginTab()
})
