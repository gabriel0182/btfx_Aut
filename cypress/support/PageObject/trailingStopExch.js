class trailingStopExch {
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
		const buy = cy.get('#buyButton')
		buy.click()
		const distance = cy.get('.order-errors').get('.order-errors__wrapper').get('li')
		distance.should('contain', 'Distance USD must be a number')
		const btc = cy.get('.order-errors').get('.order-errors__wrapper').get('li')
		btc.should('contain', 'Amount BTC must be a number')
		return this
	}
	verifyFields() {
		const orderType = cy.waitUntil(() =>
			cy.get('[data-qa-id="order-form__order-type-dropdown"]').click()
		)
		const selectOrder = cy.waitUntil(() =>
			cy.get('[data-qa-id="order-form__order-type-dropdown-menu"]').within(() => {
				cy.get('#orderFormDropdownItem_trailingstop')
					.get('[data-qa-id="order-form__order-type-dropdown-menu-item-trailingstop"]')
					.click()
			})
		)
		const wallet = cy.get('#form-choose-exchange').get('#form-choose-exchange > span').click()
		const TIF = cy.get('.orderform__field > .ui-labeledcheckbox__container > label')
		TIF.should('be.visible')
		const marginWallet = cy.get('#form-choose-margin')
		cy.get('#form-choose-margin > span')
		marginWallet.click()
		const TIFMargin = cy.get(
			'.orderform__options > :nth-child(1) > .ui-labeledcheckbox__container > label'
		)
		TIFMargin.should('be.visible')
		const reduceOnlyMargin = cy.get(
			'.orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label'
		)
		reduceOnlyMargin.should('be.visible')
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
				//Read the current BTC/USD price
				cy.get(':nth-child(2) > h5 > span').then(($btn) => {
					const txt = $btn.text()
					const distanceUSD = cy.get('[name="price"]')
					distanceUSD.type(txt)
					const amountBTC = cy.get('[name="amount"]')
					amountBTC.type(data.btc)
					const orderFrom = cy.get('#form-choose-exchange').contains(data.wallet1)
					orderFrom.click().wait(2000)
				})
			})
		})
		return this
	}
	buyButton() {
		const exchangeBuy = cy.get('#buyButton')
		exchangeBuy.click()
		return this
	}
	successMsg() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach((testDataRow) => {
			const data = {
				price: testDataRow.price,
				btc: testDataRow.btc,
			}
			context(`Generating a test for ${data.price}`, () => {
				const msg = cy.waitUntil(() => cy.get('.notification-text__text').should('be.visible'))
				const verifyMsg = cy.waitUntil(() =>
					cy
						.get('.notification-text__text')
						.should('contain', `Created exchange trailing stop buy order of ${data.btc} BTC`)
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
				const testData = require('../../fixtures/orders.json')
				testData.forEach((testDataRow) => {
					const data = {
						btc: testDataRow.btc,
					}
					context(`Generating a test for ${data.btc}`, () => {
						const msgCancel = cy.waitUntil(() =>
							cy.get('.notification-text__text').should('be.visible')
						)
						const verifyMsg = cy.waitUntil(() =>
							cy
								.get('.notification-text__text')
								.should(
									'contain',
									`Exchange trailing stop buy order of ${data.btc} BTC has been canceled`
								)
						)
					})
				})
			})
		return this
	}
}
export default trailingStopExch
