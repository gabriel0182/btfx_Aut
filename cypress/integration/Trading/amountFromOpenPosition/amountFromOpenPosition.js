
import orderform from '../../../support/PageObject/orderForm'
import orderForm from '../../../support/PageObject/orderForm'
import position from '../../../support/PageObject/positions'

And('I have an open BTCUSD position', () => {
	position.addPosition()
    position.createLong()
})

when('I click on the amount value of the position', () => {
    position.clickOnPositionamount()
	
})

Then('The Order Form amount value will equal the position amount value', () => {
    orderform.compareOrderAmountFromPosition()
    position.cancelPosition()
	
})