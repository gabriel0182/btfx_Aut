///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import fundingForm from '../../../support/PageObject/fundingForm.js'
import provided from '../../../support/PageObject/provided.js'

Given('I go to the funding page', () => {
	login.landing()
	login.visitBitfinexHomePage()
	fundingForm.goFundingPage()
})

When('I select the ticker', () => {
	provided.selectTicker()
})

When('I type the funding required info', () => {
	provided.createOffer()
})

When('I select the Offer button', () => {
	provided.processOffer()
})

Then('I verify the offer was processed as provided funding', () => {
	provided.validateProvided()
})
