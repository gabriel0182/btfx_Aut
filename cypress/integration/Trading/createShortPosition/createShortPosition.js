///  <reference types="cypress"/>

import shortPosition from '../../../support/PageObject/shortPosition.js'

const pst = new shortPosition()

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
