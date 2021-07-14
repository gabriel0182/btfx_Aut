import { Before, defineStep } from 'cypress-cucumber-preprocessor/steps'
import login from '../../support/PageObject/login'
import tickers from '../../support/PageObject/tickers.js'

defineStep('I go to Trading page', () => {
	cy.visit('https://bfx-ui-trading.staging.bitfinex.com/trading')
})

defineStep('I Select a currency', () => {
	tickers.selectTicker()
})

Before({ tags: '@loginBitfinex' }, () => {
	login.longIn()
})
