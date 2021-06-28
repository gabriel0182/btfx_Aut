///  <reference types="cypress"/>

import login from '../PageObject/login.js'
import fundingForm from '../PageObject/fundingForm.js'

const staging = new login()
const form = new fundingForm()

Given('I go to funding page', () => {
	staging.landing()
	staging.longIn()
	form.goFundingPage()
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
