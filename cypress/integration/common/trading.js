import { defineStep } from 'cypress-cucumber-preprocessor/steps'
import tickers from '../../support/PageObject/tickers.js'
import orderBook from '../../support/PageObject/orderBook.js'

defineStep('I am viewing the trading page', () => {
	orderBook.isVisible()
})

defineStep('I select the ticker {string}', (currencyPair) => {
	tickers.selectCurrencyPair(currencyPair)
})
