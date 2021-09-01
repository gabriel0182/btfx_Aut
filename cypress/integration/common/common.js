import { Before } from 'cypress-cucumber-preprocessor/steps'
import login from '../../support/PageObject/login'

Before({ tags: '@loginBitfinex' }, () => {
	login.logIn()
})
