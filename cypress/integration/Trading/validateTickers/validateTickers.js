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
Then('The tickers table displays only margin-enabled tickers', () => {
	tickers.setMarginOnly()
})
Then('The tickers table displays all tickers', () => {
	tickers.offMarginOnly()
})

Then('The favourite icon, on the BTCUSD ticker row, is blue', () => {
	tickers.setFavouriteTicker()
})
Then('The Ticker table displays favourite tickers only', () => {
	tickers.setOnlyFavorites()
})
Then('The favourite icon, on the BTCUSD ticker row, is not blue', () => {
	tickers.uncheckTiker()
})