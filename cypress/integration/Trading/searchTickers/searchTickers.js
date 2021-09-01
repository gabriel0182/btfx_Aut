///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'

When('I search for tickers containing BTC', () => {
	tickers.searchTicker()
})

Then('The ticker list contains pairs containing BTC', () => {	
	tickers.btcTickerList()
})