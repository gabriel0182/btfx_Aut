///  <reference types="cypress"/>

import login from '../PageObject/login.js'
import fundingForm from '../PageObject/fundingForm.js'
import provided from '../PageObject/provided.js'

const staging = new login()

Given('I go to the funding page', () => {
	staging.landing()
	staging.longIn()
    fundingForm.goFundingPage();
	
})

When('I select the ticker', () => {
	provided.selectTicker();
})

When('I type the funding required info', () => {
    provided.createOffer();
	
})

When('I select the Offer button', () => {
	provided.processOffer();
})

Then('I verify the offer was processed as provided funding', () => {
	provided.validateProvided();
})
