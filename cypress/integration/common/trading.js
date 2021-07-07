import { defineStep } from 'cypress-cucumber-preprocessor/steps'

defineStep('I go to Trading page', () => {
	login.landing()
	login.longIn()
})
