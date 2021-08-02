///  <reference types="cypress"/>

import login from '../../../support/PageObject/login'
import fundingForm from '../../../support/PageObject/fundingForm'

Given('I go to funding page', () => {
	login.landing()
	login.visitBitfinexHomePage()
	fundingForm.goFundingPage()
})

When('I select a Ticker', () => {
	form.selectTicker()
})

When('I verify the required fields', () => {
	form.requiredFields()
})

Then('I verify the funding form', () => {
	form.validateFundingForm()
	form.validateHighestBid()
	form.validateLowestOffer()
	form.validateOfferAll()
})
