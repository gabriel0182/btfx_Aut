///  <reference types="cypress"/>

import positions from '../../../support/PageObject/positions'

When('I select the Create a New Position option', () => {
	positions.addPosition()
})

Then('I verify the position Min-Max amount', () => {
	positions.minMaxPositionAmount()
})

Then('I verify the sorting shoud work', () => {
	positions.addPosition()
	positions.createLong()
	positions.sortingPositionTable()
	positions.cancelPosition()
})
