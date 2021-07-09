class buyLimitExch {
	orderInfo() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach((testDataRow) => {
			const data = {
				btc: testDataRow.btc,
			}
			context(`Generating a test for ${data.wallet1}`, () => {
				const orderForm = cy.waitUntil(() =>
					cy.get('#orderform-panel').should('be.visible').should('exist')
				)
				cy.get('.main-ticker__items > :nth-child(5) > :nth-child(2)').then(($btn) => {
					const txt = $btn.text()
					const priceUSD = cy.get('#priceinput1').clear({ force: true }).type(txt)
				})
				const amountBTC = cy.get('[name="amount"]')
				amountBTC.clear().type(data.btc).wait(2000)
			})
		})
		return this
	}

	buyButton() {
		const exchangeBuy = cy.get('#buyButton')
		exchangeBuy.click()
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
		const side = cy.get('[data-qa-id="orders-filter-side-buy"] > .filter-select__selection-label')
		side.click()
		const apply = cy.get('.filter-select__actions > .ui-button')
		apply.click()
		const appliedType = cy.get(
			'[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .filter-select__summary > [data-qa-id="orders-filter-summary-type-exchange"] > .filter-select__selection-label'
		)
		appliedType.should('contain', 'Exchange')
		const appliedSide = cy.get(
			'[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .filter-select__summary > [data-qa-id="orders-filter-summary-side-buy"] > .filter-select__selection-label'
		)
		appliedSide.should('contain', 'Bids')
		return this
	}
	validateMarkers() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach((testDataRow) => {
			const data = {
				btc: testDataRow.btc,
			}
			context(`Generating a test for ${data.btc}`, () => {
				const bookTable = cy.waitUntil(() =>
					cy
						.get(
							'.split__main > .ui-panel > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body'
						)
						.get('#book-bids')
						.get('div.book__order-i.book__order-green')
						.should('be.visible')
						.trigger('mouseover')
						.get('div.book__order-tooltip')
						.invoke('show')
						.should('contain', 'EXCHANGE LIMIT')
						.get('div.book__order-tooltip > span')
						.should('contain', `${data.btc}`)
				)
			})
		})
		return this
	}
	cancelOrder() {
		const ordersTable = cy
			.get('[data-qa-id="orders-table"]')
			.get('div')
			.first()
			.each(($div) => {
				cy.get(
					'[style="position: absolute; left: 0px; top: 25px; height: 25px; width: 100%; padding-right: 0px;"]'
				)
					.get(
						'[style="position: absolute; left: 0px; top: 25px; height: 25px; width: 100%; padding-right: 0px;"] > [style="flex: 0 1 105px; min-width: 105px; max-width: 105px;"] > :nth-child(3) > .ui-button > .fa'
					)
					.click()
			})
		const testData = require('../../fixtures/orders.json')
		testData.forEach((testDataRow) => {
			const data = {
				btc: testDataRow.btc,
			}
			context(`Generating a test for ${data.btc}`, () => {
				const msgCancel = cy.waitUntil(() =>
					cy
						.get('.notification-text__text')
						.should('be.visible')
						.should('contain', `Exchange limit buy order of ${data.btc} BTC has been canceled`)
				)
			})
		})
		return this
	}
}

export default buyLimitExch
