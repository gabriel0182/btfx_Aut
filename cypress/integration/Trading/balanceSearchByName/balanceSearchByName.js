///  <reference types="cypress"/>

import balance from '../../../support/PageObject/balance'

When('I type {string} into the Balances search input', (currency) => {
	balance.isVisible()
	balance.search(currency)
})

Then('The balances table only shows {string} balances', (currencySymbol) => {
	balance.validateSearchResult(currencySymbol)
})
