///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'

When('I change the ticker to ETHUSD', () => {
	tickers.changeTicker()
})

Then('The URL changes', () => {
	tickers.validateURL()
})