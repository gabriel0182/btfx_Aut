///  <reference types="cypress"/>

import balance from '../../../support/PageObject/balance'
import summary from '../../../support/PageObject/summary'

And('I have {string} in the balance of my margin wallet', (currencyBalance) => {
	balance.search(currencyBalance)
	balance.validateSearchResult(currencyBalance)
	balance.marginBalanceAvailable()
})

Then('My Tradable Balance should be {string} x times my USD margin balance', (leverage) => {
	summary.validateTradableBalance(leverage)
})
