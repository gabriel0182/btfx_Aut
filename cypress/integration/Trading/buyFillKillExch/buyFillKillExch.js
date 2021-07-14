///  <reference types="cypress"/>

import buyFillKill from '../../../support/PageObject/buyFillKill.js'

When('I type the order required info', () => {
	buyFillKill.verifyFields()
	buyFillKill.requiredFields()
	buyFillKill.orderInfo()
})

When('I select to Exchange Buy', () => {
	buyFillKill.buyButton()
})

Then('I verify the Fill or Kill buy order from Exchange wallet was created', () => {
	buyFillKill.successMsg()
})
