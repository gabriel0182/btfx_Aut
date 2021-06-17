///  <reference types="cypress"/>

import login from '../PageObject/login.js'
import longPosition from '../PageObject/longPosition.js'

const staging = new login()
const pstl = new longPosition()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
})

When('I select the Create a New Long Position option', () => {
	pstl.addPosition()
})

When('I fill out all the required fields', () => {
	pstl.requiredInfo()
})

Then('I verify the position was created', () => {
	pstl.successMsg()
	pstl.cancelPosition()
})
