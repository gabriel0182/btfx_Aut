///  <reference types="cypress"/>

import orderBook from '../../../support/PageObject/orderBook.js'
import orderform from '../../../support/PageObject/orderform.js'
import tickers from '../../../support/PageObject/tickers'

When('I Select a currency', () => {
	tickers.selectTicker()
})

Then('I verify the Order form max buy / sell', () => {
	orderform.checkMaxValue()
})

Then('I verify the Order from best bid / ask', () => {
	orderform.checkBestValue()
})

Then('I verify the alerts in order book table', () => {
	orderBook.addAlert()
})

Then('I verify the order book precision and aggregation', () => {
	orderBook.bookZoomAdd()
	orderBook.bookZoomReduce()
	orderBook.increaseDecreasePrecision()
})
