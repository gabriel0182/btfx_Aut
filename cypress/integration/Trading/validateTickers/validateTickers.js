///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'

Then('The tickers list only contains USDt pairs', () => {
	tickers.tickerPairFilter()
	tickers.volumeAmount()
})

Then('The ticker list contains pairs containing BTC', () => {
	tickers.searchTicker()
})

Then('The URL changes', () => {
	tickers.changeTicker()
})
Then('The Large Ticker Low Volume amount should be less than the High Volume amount.', () => {
	tickers.volumeAmount()
})
