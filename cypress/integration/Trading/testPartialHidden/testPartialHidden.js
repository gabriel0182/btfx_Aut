///  <reference types="cypress"/>

import buyLimitExch from '../../../support/PageObject/buyLimitExch.js'
import partialHidden from '../../../support/PageObject/partialHidden.js'

const ptHidden = new partialHidden()

And('I increase precision', () => {
	ptHidden.increasePrecision()
})

When('I place a hidden limit order at the spread price', () => {
	ptHidden.placeLimit()
})

When('I place a market order in the opposite direction for half the amount', () => {
	ptHidden.placeMarket()
})

Then('The hidden limit order will get partially filled for half the amount', () => {
	ptHidden.verifyPartialLabel()
	ptHidden.cancelOrders()
})
