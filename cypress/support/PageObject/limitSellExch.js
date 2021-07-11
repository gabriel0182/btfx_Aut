class limitSellExch {
	validateMin() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach((testDataRow) => {
			const data = {
				wallet1: testDataRow.wallet1,
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
				cy.get('.main-ticker__items > :nth-child(6) > :nth-child(2)').then(($btn) => {
					const txt = $btn.text()
					const priceUSD = cy.get('[name="price"]').type(txt)
				})
				const amountBTC = cy.get('[name="amount"]')
				amountBTC.type(data.min)
				const orderFrom = cy.get('#form-choose-exchange').contains(data.wallet1)
				orderFrom.click()
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
		testData.forEach((testDataRow) => {
			const data = {
				max: testDataRow.max,
			}
			context(`Generating a test for ${data.wallet1}`, () => {
				const orderForm = cy.waitUntil(() =>
					cy.get('#orderform-panel').should('be.visible').should('exist')
				)
				cy.get('.main-ticker__items > :nth-child(6) > :nth-child(2)').then(($btn) => {
					const txt = $btn.text()
					const priceUSD = cy.get('#priceinput1').clear({ force: true }).type(txt)
				})
				const amountBTC = cy.get('[name="amount"]')
				amountBTC.clear().type(data.max)
			})
		})
		const exchangeSell = cy.get('#sellButton')
		exchangeSell.click()
		const validateMsg = cy.waitUntil(() =>
			cy
				.get('.notification-text__text')
				.should('contain', `Invalid order: maximum size for BTC/USD`)
		)
		return this
	}
	orderFilter() {
		const filter = cy.get(
			'[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .ui-contextmenu__wrapper > .btn'
		)
		filter.click()
		const type = cy.get(
			'[data-qa-id="orders-filter-type-exchange"] > .filter-select__selection-label'
		)
		type.click()
		const side = cy.get('[data-qa-id="orders-filter-side-sell"] > .filter-select__selection-label')
		side.click()
		const apply = cy.get('.filter-select__actions > .ui-button')
		apply.click()
		const appliedType = cy.get(
			'[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .filter-select__summary > [data-qa-id="orders-filter-summary-type-exchange"] > .filter-select__selection-label'
		)
		appliedType.should('contain', 'Exchange')
		const appliedSide = cy.get(
			'[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .filter-select__summary > [data-qa-id="orders-filter-summary-side-sell"] > .filter-select__selection-label'
		)
		appliedSide.should('contain', 'Asks')
		return this
	}
}

export default limitSellExch
