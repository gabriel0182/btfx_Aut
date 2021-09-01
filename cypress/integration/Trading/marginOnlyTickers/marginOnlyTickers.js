///  <reference types="cypress"/>

import tickers from '../../../support/PageObject/tickers'

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

