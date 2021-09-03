///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'

Then('The new URL includes {string}', (currencyPair) => {
	tickers.validateURL(currencyPair)
})
