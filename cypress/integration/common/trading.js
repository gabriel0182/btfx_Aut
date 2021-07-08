import { defineStep } from 'cypress-cucumber-preprocessor/steps'
import login from '../../support/PageObject/login'

defineStep('I go to Trading page', () => {
	login.landing()
	login.longIn()
})
