import { defineStep } from 'cypress-cucumber-preprocessor/steps'

defineStep('I go to the funding page', () => {
	cy.visit('https://bfx-ui-trading.staging.bitfinex.com/funding')
})
