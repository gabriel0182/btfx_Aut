///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'

When('I select USDt from the pair filter', () => {
	tickers.selectPairFilter()
})

Then('The tickers list only contains USDt pairs', () => {
	tickers.tickerPairFilter()
	tickers.volumeAmount()
})
When('I search for tickers containing BTC', () => {
	tickers.searchTicker()
})

Then('The ticker list contains pairs containing BTC', () => {	
	tickers.btcTickerList()
})

When('I change the ticker to ETHUSD', () => {
	tickers.changeTicker()
})

Then('The URL changes', () => {
	tickers.validateURL()
})
Then('The Large Ticker Low Volume amount should be less than the High Volume amount.', () => {
	tickers.volumeAmount()
})
When('I enable the margin filter on the Tickers component', () => {
	tickers.enableMarginOnly()
})
Then('The tickers table displays only margin-enabled tickers', () => {
	tickers.displayMarginEnabled()
})
When('I disable the margin filter on the Tickers component', () => {
	tickers.disableMarginOnly()
})
Then('The tickers table displays all tickers', () => {
	tickers.displayAll()
})

When('I add BTCUSD as a favourite ticker', () => {
	tickers.addFavoriteBTCUSD()
})
Then('The favourite icon, on the BTCUSD ticker row, is blue', () => {
	tickers.favoriteBlueBTCUSD()
})
When('I remove BTCUSD as a favourite ticker', () => {
	tickers.removeFavoriteBTCUSD()
})
Then('The favourite icon, on the BTCUSD ticker row, is not blue', () => {
	tickers.notBlueBTCUSD()
})
When('I add BTCUSD as a favourite ticker', () => {
	tickers.addFavoriteBTCUSD()
})
When('I click on the favourite icon within the Tickers component header', () => {
	tickers.setOnlyFavorites()
})
Then('The Ticker table displays favourite tickers only', () => {
	tickers.viewOnlyFavorites()
	tickers.removeFavorites()
})
