///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'

Then('The tickers list only contains USDt pairs', () => {
	tickers.tickerPairFilter()
})

Then('The ticker list contains pairs containing BTC', () => {
	tickers.searchTicker()
})

Then("The URL changes", () => {
	tickers.changeTicker()
})
