///  <reference types="cypress"/>
import orderBook from '../../../support/PageObject/orderBook'
import orderForm from '../../../support/PageObject/orderForm'

Given('I select {string} order', (orderType) => {
	orderForm.selectOrderType(orderType)
})

When('I click the Set Price To Highest Bid button on the Order Form', () => {
	orderForm.setPriceToHighestBid()
})

Then('The price field is populated with the best Bid price', () => {
	orderBook.validatePriceHighestBid()
})
