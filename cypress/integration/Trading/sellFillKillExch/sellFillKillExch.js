///  <reference types="cypress"/>

import sellFillKill from '../../../support/PageObject/sellFillKill.js'
import buyFillKill from '../../../support/PageObject/buyFillKill.js'

When('I type the order required info', () => {
	buyFillKill.verifyFields()
	sellFillKill.requiredFields()
	sellFillKill.orderInfo()
})

When('I select to Exchange Sell', () => {
	sellFillKill.sellButton()
})

Then('I verify the Fill or Kill sell order from Exchange wallet was created', () => {
	sellFillKill.successMsg()
})
