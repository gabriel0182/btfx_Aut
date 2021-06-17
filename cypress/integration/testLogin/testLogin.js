///  <reference types="cypress"/>

import login from '../PageObject/login.js'

const staging = new login()

Given('I visit the homepage', () => {
	staging.landing()
})

When('I type my user, pass and login', () => {
	staging.longIn()
})

Then('I verify my user is logged on', () => {
	staging.verifyLoggedOn()
})
