///  <reference types="cypress"/>

import partialHidden from '../../../support/PageObject/partialHidden'

const ptHidden = new partialHidden()

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
