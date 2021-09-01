///  <reference types="cypress"/>

import positions from '../../../support/PageObject/positions'
import messages from '../../../../support/PageObject/messages'

When('I select the Create a New Long Position option', () => {
	positions.addPosition()
})

Then('I verify the position was created', () => {
	positions.createLong()
	messages.confirmLongPosition()
})

Then('I verify the position was cancelled', () => {
	positions.cancelPosition()
	messages.confirmCancelLongPosition()
})
