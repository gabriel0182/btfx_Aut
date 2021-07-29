class sellLimitBook {
	trading() {
		const tradingTab = cy.waitUntil(() =>
			cy
				.get('.header__nav-buttons-wrapper > .header__nav-trading')
				.should('be.visible')
				.click()
				.get('#book-bids > .book__rows')
				.should('be.visible')
		)
		return this
	}
	requiredFields() {
		const bookTable = cy
			.get(
				'.split__main > .ui-panel > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body'
			)
			.get('div')
			.first()
			.each(($div) => {
				cy.get('#book-bids > .book__rows > :nth-child(1) > .book__row')
					.get('#book-bids > .book__rows > :nth-child(1) > .book__row > :nth-child(4) > span')
					.click()
			})
		const btc = cy.get('.order-errors').get('.order-errors__wrapper').get('li')
		btc.should('contain', 'Amount BTC must be a number')
		return this
	}
	orderInfo() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach((testDataRow) => {
			const data = {
				btc: testDataRow.btc,
				ticker: testDataRow.ticker,
			}
			context(`Generating a test for ${data.wallet1}`, () => {
				const orderForm = cy.waitUntil(() =>
					cy.get('#orderform-panel').should('be.visible').should('exist')
				)
				const searchTicker = cy.get('#ticker-textinput-id')
				searchTicker.type(`${data.ticker}{enter}`)
				const currency = cy
					.get('[data-qa-id="ticker-list-pair-filter"]')
					.click()
					.get('[id="Item_USD"]')
					.get('[data-qa-id="ticker-list-pair-filter-menu-item-USD"]')
					.click()
				const selectTicker = cy.get('div.virtable__cellwrapper--rightalign').within(() => {
					cy.get('[href="/t/BTC:USD"]').click()
				})
				const amountBTC = cy.get('#amountinput3')
				amountBTC.type(data.btc)
			})
		})
		return this
	}
	selectField() {
		const bookTable = cy.waitUntil(() => {
			cy.get(
				'.split__main > .ui-panel > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body'
			)
				.get('div')
				.first()
				.each(($div) => {
					cy.get('#book-bids > .book__rows > :nth-child(1) > .book__row')
						.get('#book-bids > .book__rows > :nth-child(1) > .book__row > :nth-child(4) > span')
						.click()
				})
			return this
		})
	}
	successMsg() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach((testDataRow) => {
			const data = {
				btc: testDataRow.btc,
			}
			context(`Generating a test for ${data.price}`, () => {
				const msg = cy.waitUntil(() => cy.get('.notification-text__text').should('be.visible'))
				const verifyMsg = cy.waitUntil(() =>
					cy
						.get('.notification-text__text')
						.should(
							'contain',
							`Exchange limit sell order of ${data.btc} BTC has been fully executed`
						)
				)
			})
		})
		return this
	}
}
export default sellLimitBook
