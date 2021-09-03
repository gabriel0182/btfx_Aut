///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'

When('I search for tickers containing {string}', (currency) => {
	tickers.searchTicker(currency)
})

Then('The ticker list contains pairs containing {string}', (currency) => {
	tickers.tickerListContains(currency)
})
