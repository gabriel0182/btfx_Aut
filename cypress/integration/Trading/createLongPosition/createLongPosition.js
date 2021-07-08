///  <reference types="cypress"/>

import longPosition from '../../../support/PageObject/longPosition.js'

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
