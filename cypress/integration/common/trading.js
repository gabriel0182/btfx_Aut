import { defineStep } from 'cypress-cucumber-preprocessor/steps'
import tickers from '../../support/PageObject/tickers.js'
import orderBook from '../../support/PageObject/orderBook.js'
const urlApiPub = 'https://api-pub.staging.bitfinex.com/v2'

defineStep('I am viewing the trading page', () => {
	orderBook.isVisible()
})

defineStep('I select a currency', () => {
	tickers.selectTicker()
	//orderBook.isVisible()
})
