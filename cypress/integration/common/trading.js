import { defineStep } from 'cypress-cucumber-preprocessor/steps'
import tickers from '../../support/PageObject/tickers.js'
import orderBook from '../../support/PageObject/orderBook.js'

defineStep('I visit to Trading page', () => {
	orderBook.isVisible()
})

defineStep('I select a currency', () => {
	tickers.selectTicker()
	orderBook.isVisible()
})
