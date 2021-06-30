///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import buyLimitExch from '../../../support/PageObject/buyLimitExch.js'
import partialHidden from '../../../support/PageObject/partialHidden.js'

const staging = new login()
const limitExch = new buyLimitExch()
const ptHidden = new partialHidden()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
	limitExch.trading()
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
