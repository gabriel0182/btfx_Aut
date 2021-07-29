class sellFillKill {
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
		const exchangeSell = cy.get('#sellButton')
		exchangeSell.click()
		const distance = cy.get('.order-errors').get('.order-errors__wrapper').get('li')
		distance.should('contain', 'Price USD must be a number')
		const btc = cy.get('.order-errors').get('.order-errors__wrapper').get('li')
		btc.should('contain', 'Amount BTC must be a number')
		return this
	}
	orderInfo() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach((testDataRow) => {
			const data = {
				wallet1: testDataRow.wallet1,
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
				cy.get('.main-ticker__items > :nth-child(5) > :nth-child(2)').then(($btn) => {
					let txt = $btn.text()
					var pointNum = parseInt(txt)
					var amount = pointNum * 1005
					const distanceUSD = cy.get('[name="price"]')
					distanceUSD.type(`${amount}`)
					const amountBTC = cy.get('[name="amount"]')
					amountBTC.type(data.btc)
					const orderFrom = cy.get('#form-choose-exchange').contains(data.wallet1)
					orderFrom.click().wait(2000)
				})
			})
		})
		return this
	}
	sellButton() {
		const exchangeSell = cy.get('#sellButton')
		exchangeSell
			.click()
			.get('.ui-modaldialog__footer')
			.get('.ui-modaldialog__footer > .ui-button--green')
			.click()
		return this
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
						.should('contain', `Exchange fok sell order of ${data.btc} BTC has been fully executed`)
				)
			})
		})
		return this
	}
}

export default sellFillKill
