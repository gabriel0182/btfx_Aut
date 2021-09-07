///  <reference types="cypress"/>
import orderform from '../../../support/PageObject/orderForm'
import orderForm from '../../../support/PageObject/orderForm'

When('I click the Exchange Buy button', () => {
	orderform.clickOnExchangeBuyButton()
})

When('I click the Exchange Submit button', () => {
	orderform.clickOnSubmitButton()
})

Then('The {string} validation error is displayed', (errorMessage) => {
	orderform.orderErrorDisplayed(errorMessage)
})

And('The {string} Order form option is selected', (orderFormOption) => {
	orderform.checkOrderFormOption(orderFormOption)
})

And('The {string} order type is selected', (orderType) => {
	orderForm.selectOrderType(orderType)
})
