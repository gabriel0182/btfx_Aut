///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'

Then('The Large Ticker Low Volume amount should be less than the High Volume amount', () => {
	tickers.volumeAmount()
})