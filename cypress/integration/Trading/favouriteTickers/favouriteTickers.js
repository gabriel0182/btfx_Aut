///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'

When('I add BTCUSD as a favourite ticker', () => {
	tickers.addFavoriteBTCUSD()
})

When('I click on the favourite icon within the Tickers component header', () => {
	tickers.setOnlyFavorites()
})

When('I remove BTCUSD as a favourite ticker', () => {
	tickers.removeFavoriteBTCUSD()
})

Then('The favourite icon, on the BTCUSD ticker row, is blue', () => {
	tickers.favoriteBlueBTCUSD()
})

Then('The favourite icon, on the BTCUSD ticker row, is not blue', () => {
	tickers.notBlueBTCUSD()
})

Then('The Ticker table displays favourite tickers only', () => {
	tickers.viewOnlyFavorites()
	tickers.removeFavorites()
})

