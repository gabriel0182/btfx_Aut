///  <reference types="cypress"/>

import login from '../../../support/PageObject/login.js'
import longPosition from '../../../support/PageObject/longPosition.js'

const staging = new login()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
})

When('I select the Create a New Long Position option', () => {
	longPosition.addPosition()
})

When('I fill out all the required fields', () => {
	longPosition.requiredInfo()
})

Then('I verify the position was created', () => {
	longPosition.successMsg()
	longPosition.cancelPosition()
})
