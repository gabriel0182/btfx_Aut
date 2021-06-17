///  <reference types="cypress"/>

import login from '../PageObject/login.js'
import shortPosition from '../PageObject/shortPosition.js'

const staging = new login()
const pst = new shortPosition()

Given('I go to Trading page', () => {
	staging.landing()
	staging.longIn()
})

When('I select the Create a New Position option', () => {
	pst.addPosition()
})

When('I fill out all the required fields', () => {
	pst.requiredInfo()
})

Then('I verify the position was created', () => {
	pst.successMsg()
	pst.testSortingPositions()
	pst.cancelPosition()
})
