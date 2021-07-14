///  <reference types="cypress"/>

import orderBook from '../../../support/PageObject/orderBook.js'

Then('I verify the alerts in order book table', () => {
	orderBook.addAlert()
})

Then('I verify the order book precision and aggregation', () => {
	orderBook.bookZoomAdd()
	orderBook.bookZoomReduce()
	orderBook.increaseDecreasePrecision()
})
