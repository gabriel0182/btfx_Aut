import { After, Before, defineStep } from 'cypress-cucumber-preprocessor/steps'
import login from '../../support/PageObject/login'

Before({ tags: '@loginBitfinex' }, () => {
	login.logIn()
})

After({ tags: '@logoutBitfinex' }, () => {
	login.logout()
})
