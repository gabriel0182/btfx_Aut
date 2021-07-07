import { defineStep } from 'cypress-cucumber-preprocessor/steps'
import login from '../../support/PageObject/login'

const staging = new login()

defineStep('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
})
