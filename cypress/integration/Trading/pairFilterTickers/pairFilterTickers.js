///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'

When('I select {string} from the pair filter', (quoteCurrency) => {
	tickers.selectPairFilter(quoteCurrency)
})

Then('The tickers list only contains {string} pairs', (currency) => {
	tickers.lastTickerListContains(currency)
	tickers.volumeAmount()
})
