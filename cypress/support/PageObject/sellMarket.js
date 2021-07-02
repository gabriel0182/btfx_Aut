class sellMarket {
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
		const sell = cy.get('#sellButton')
		sell.click()
		const btc = cy.get('.order-errors').get('.order-errors__wrapper').get('li')
		btc.should('contain', 'Amount BTC must be a number')
		return this
	}
	validateMin() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach(testDataRow => {
			const data = {
				min: testDataRow.min,
				ticker: testDataRow.ticker,
			}
			context(`Generating a test for ${data.wallet1}`, () => {
				const orderForm = cy.waitUntil(() =>
					cy.get('#orderform-panel').should('be.visible').should('exist')
				)
				const searchTicker = cy.get('#ticker-search-input')
				searchTicker.type(`${data.ticker}{enter}`)
				const selectTicker = cy.get('div.virtable__cellwrapper--rightalign').within(() => {
					cy.get('[href="/t/BTC:USD"]').click()
				})
				const amountBTC = cy.get('[name="amount"]')
				amountBTC.type(data.min)
			})
		})
		const exchangeSell = cy.get('#sellButton')
		exchangeSell.click()
		const validateMsg = cy.waitUntil(() =>
			cy
				.get('.notification-text__text')
				.should('contain', `Invalid order: minimum size for BTC/USD`)
		)
		return this
	}
	validateMax() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach(testDataRow => {
			const data = {
				max: testDataRow.max,
			}
			context(`Generating a test for ${data.wallet1}`, () => {
				const orderForm = cy.waitUntil(() =>
					cy.get('#orderform-panel').should('be.visible').should('exist')
				)
				const amountBTC = cy.get('[name="amount"]')
				amountBTC.clear().type(data.max)
			})
		})
		const exchangeSell = cy.get('#sellButton')
		exchangeSell.click()
		const modal = cy
			.get('.ui-modaldialog__footer')
			.get('.ui-modaldialog__footer > .ui-button--green')
		modal.click()
		const validateMsg = cy.waitUntil(() =>
			cy
				.get('.notification-text__text')
				.should('contain', `Invalid order: maximum size for BTC/USD`)
		)
		return this
	}
	orderInfo() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach(testDataRow => {
			const data = {
				btc: testDataRow.btc,
				ticker: testDataRow.ticker,
			}
			context(`Generating a test for ${data.wallet1}`, () => {
				const orderForm = cy.waitUntil(() =>
					cy.get('#orderform-panel').should('be.visible').should('exist')
				)
				const amountBTC = cy.get('[name="amount"]')
				amountBTC.clear().type(data.btc).wait(2000)
			})
		})
		return this
	}
	sellButton() {
		const exchangeSell = cy.get('#sellButton')
		exchangeSell.click()
		return this
	}
	successMsg() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach(testDataRow => {
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
							`Margin market sell order of ${data.btc} BTC has been fully executed`
						)
				)
			})
		})
		return this
	}
	orderFilter() {
		const filter = cy.get(
			'[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .ui-contextmenu__wrapper > .btn'
		)
		filter.click()
		const reset = cy.get('.filter-select__reset-btn')
		reset.click()
		return this
	}
	cancelPosition() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach(testDataRow => {
			const data = {
				btc: testDataRow.btc,
			}
			context(`Generating a test for ${data.amount}`, () => {
				const positionsTable = cy
					.get('[style="height: 25px; width: 100%;"] > .table-vir__row')
					.get('div')
					.first()
					.each($div => {
						cy.get('[style="flex: 0 1 110px;"] > div > :nth-child(1) > .ui-button')
						cy.get('[style="flex: 0 1 110px;"] > div > :nth-child(1) > .ui-button > .fa').click()
					})
				const confirm = cy
					.get('.ui-modaldialog__footer')
					.get('.ui-modaldialog__footer > .ui-button--green')
				confirm.click()
				const msgCancel = cy.waitUntil(() =>
					cy
						.get('.notification-text__text')
						.should('be.visible')
						.should('contain', `Margin market buy order of ${data.btc} BTC has been fully executed`)
				)
			})
		})
		return this
	}
}
export default sellMarket