///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'

Given('I visit the homepage', () => {
	login.landing()
})

When('I type my user, pass and login', () => {
	login.longIn()
})

Then('I verify my user is logged on', () => {
	login.verifyLoggedOn()
})
