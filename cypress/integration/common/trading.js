import { defineStep } from 'cypress-cucumber-preprocessor/steps'
import tickers from '../../support/PageObject/tickers.js'
import orderBook from '../../support/PageObject/orderBook.js'

defineStep('I visit to Trading page', () => {
	cy.visit('https://bfx-ui-trading.staging.bitfinex.com/trading')
	cy.wait('@listFeature')
})

defineStep('I select a currency', () => {
	tickers.selectTicker()
	orderBook.loadOrderBook()
})
