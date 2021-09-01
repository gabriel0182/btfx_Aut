///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'

When('I change the ticker to ETHUSD', () => {
	tickers.changeTicker()
})

Then('The URL changes', () => {
	tickers.validateURL()
})

And('The Large Ticker Low Volume amount should be less than the High Volume amount', () => {
	tickers.volumeAmount()
})