///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'

When('I select USDt from the pair filter', () => {
	tickers.selectPairFilter()
})

Then('The tickers list only contains USDt pairs', () => {
	tickers.tickerPairFilter()
	tickers.volumeAmount()
})