class buyScaled {
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
		const submit = cy.get('#submitButton')
		submit.click()
		const orderDirection = cy.get('.order-errors').get('.order-errors__wrapper').get('li')
		orderDirection.should('contain', 'Order direction (buy/sell) not selected')
		const priceLower = cy.get('.order-errors').get('.order-errors__wrapper').get('li')
		priceLower.should('contain', 'Price lower USD is required')
		const priceUpper = cy.get('.order-errors').get('.order-errors__wrapper').get('li')
		priceUpper.should('contain', 'Price upper USD is required')
		const btc = cy.get('.order-errors').get('.order-errors__wrapper').get('li')
		btc.should('contain', 'Amount BTC must be a number')
		const orderCount = cy.get('.order-errors').get('.order-errors__wrapper').get('li')
		orderCount.should('contain', 'Order count is required')
		return this
	}
	verifyFields() {
		const orderType = cy.waitUntil(() =>
			cy
				.get(':nth-child(1) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap')
				.click()
				.get('ul.dropdown-content')
		)
		const selectOrder = cy.waitUntil(() =>
			cy.get('ul.dropdown-content').within(() => {
				cy.get('#orderFormDropdownItem_scaled')
					.get('[data-qa-id="order-form__order-type-dropdown-menu-item-scaled"]')
					.click()
			})
		)
		const wallet = cy.get('#form-choose-exchange').get('#form-choose-exchange > span').click()
		const hidden = cy.get(
			'.orderform__options > :nth-child(1) > .ui-labeledcheckbox__container > label'
		)
		hidden.should('be.visible')
		const postOnly = cy.get(
			'.orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label'
		)
		postOnly.should('be.visible')
		const marginWallet = cy.get('#form-choose-margin')
		cy.get('#form-choose-margin > span')
		marginWallet.click()
		const hiddenMargin = cy.get(
			'.orderform__options > :nth-child(1) > .ui-labeledcheckbox__container > label'
		)
		hiddenMargin.should('be.visible')
		const reduceOnlyMargin = cy.get(':nth-child(3) > .ui-labeledcheckbox__container > label')
		reduceOnlyMargin.should('be.visible')
		const postOnlyMargin = cy.get(
			'.orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label'
		)
		postOnlyMargin.should('be.visible')
		return this
	}
	orderInfo() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach((testDataRow) => {
			const data = {
				wallet1: testDataRow.wallet1,
				orderCount: testDataRow.orderCount,
				amountVariance: testDataRow.amountVariance,
				priceVariance: testDataRow.priceVariance,
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
					.get(':nth-child(2) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap')
					.click()
					.get('[id="Item_USD"]')
					.get('[data-qa-id="ticker-list-pair-filter-menu-item-USD"]')
					.click()
				const selectTicker = cy.get('div.virtable__cellwrapper--rightalign').within(() => {
					cy.get('[href="/t/BTC:USD"]').click()
				})
				//Read the current BTC/USD price
				cy.get('.main-ticker__items > :nth-child(5) > :nth-child(2)')
					.first()
					.then(($btn) => {
						const txt = $btn.text()
						var pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
						var amount = pointNum + 10
						const lowerUSD = cy.get('#priceinput3')
						lowerUSD.type(pointNum)
						const uperUSD = cy.get('#priceinput4')
						uperUSD.type(amount)
						const amountBTC = cy.get('#amountinput5')
						amountBTC.type(data.btc)
						const count = cy.get(
							':nth-child(4) > :nth-child(2) > .orderform__field > .ui-labeledinput__container > div > .ui-labeledinput__input'
						)
						count.type(data.orderCount)
						const variance1 = cy.get(
							':nth-child(5) > :nth-child(1) > .orderform__field > .ui-labeledinput__container > div > .ui-labeledinput__input'
						)
						variance1.type(data.amountVariance)
						const variance2 = cy.get(
							':nth-child(5) > :nth-child(2) > .orderform__field > .ui-labeledinput__container > div > .ui-labeledinput__input'
						)
						variance2.type(data.priceVariance)
						const orderFrom = cy.get('#form-choose-exchange').contains(data.wallet1)
						orderFrom.click()
					})
			})
		})
		return this
	}
	submitButton() {
		const action = cy.get('#radio-buy > .circle')
		action.click()
		const submit = cy.get('#submitButton')
		submit.click()
		return this
	}
	successMsg() {
		const msg = cy.waitUntil(() => cy.get('.notification-text__text').should('be.visible'))
		const verifyMsg = cy.waitUntil(() =>
			cy
				.get('.notification-text__text')
				.should('contain', `Created exchange limit buy order of`)
				.wait(2000)
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
	sortingOrdersTable() {
		const pairUp = cy
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
			)
			.get(
				'[style="flex: 1 1 160px; min-width: 160px; max-width: 160px;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 1 1 160px; min-width: 160px; max-width: 160px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="flex: 1 1 160px; min-width: 160px; max-width: 160px;"]')
					.should('contain', 'BTC/USD')
			})
		const pairDown = cy
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
			)
			.get(
				'[style="flex: 1 1 160px; min-width: 160px; max-width: 160px;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 1 1 160px; min-width: 160px; max-width: 160px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="flex: 1 1 160px; min-width: 160px; max-width: 160px;"]')
					.should('contain', 'BTC/USD')
			})
		const contextUp = cy
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
			)
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > [style="flex: 0 1 70px; min-width: 70px; max-width: 70px;"] > .table__title-titlewrapper'
			)
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > [style="flex: 0 1 70px; min-width: 70px; max-width: 70px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="flex: 0 1 70px; min-width: 70px; max-width: 70px;"]')
					.should('contain', 'Exchange')
			})
		const contextDown = cy
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
			)
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > [style="flex: 0 1 70px; min-width: 70px; max-width: 70px;"] > .table__title-titlewrapper'
			)
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > [style="flex: 0 1 70px; min-width: 70px; max-width: 70px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="flex: 0 1 70px; min-width: 70px; max-width: 70px;"]')
					.should('contain', 'Exchange')
			})
		const typeUp = cy
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
			)
			.get(
				'[style="flex: 0 1 71px; min-width: 71px; max-width: 71px;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 0 1 71px; min-width: 71px; max-width: 71px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="flex: 0 1 71px; min-width: 71px; max-width: 71px;"]')
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		const typeDown = cy
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
			)
			.get(
				'[style="flex: 0 1 71px; min-width: 71px; max-width: 71px;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 0 1 71px; min-width: 71px; max-width: 71px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="flex: 0 1 71px; min-width: 71px; max-width: 71px;"]')
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		const amountUp = cy
			.get('div.ui-collapsible__header')
			.get('div.table-vir__cell-sortable')
			.get('span.table__title-titlewrapper')
			.contains('Amount')
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="height: 25px; line-height: 25px;"]')
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		const amountDown = cy
			.get('div.ui-collapsible__header')
			.get('div.table-vir__cell-sortable')
			.get('span.table__title-titlewrapper')
			.contains('Amount')
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="height: 25px; line-height: 25px;"]')
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		const priceUp = cy
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
			)
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(6)'
			)
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(6) > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="flex: 1 1 100px; min-width: 60px;"]')
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		const priceDown = cy
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
			)
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(6)'
			)
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(6) > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="flex: 1 1 100px; min-width: 60px;"]')
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		const statusUp = cy
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
			)
			.get('[style="flex: 1 1 90px; min-width: 90px; display: flex; justify-content: center;"]')
			.get(
				'[style="flex: 1 1 90px; min-width: 90px; display: flex; justify-content: center;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="height: 25px; line-height: 25px;"]')
					.should('contain', 'Active')
			})
		const statusDown = cy
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
			)
			.get('[style="flex: 1 1 90px; min-width: 90px; display: flex; justify-content: center;"]')
			.get(
				'[style="flex: 1 1 90px; min-width: 90px; display: flex; justify-content: center;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="height: 25px; line-height: 25px;"]')
					.should('contain', 'Active')
			})
		const placedUp = cy
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
			)
			.get(
				'[style="flex: 0 1 140px; min-width: 120px; max-width: 140px; display: flex; justify-content: flex-end;"]'
			)
			.get(
				'[style="flex: 0 1 140px; min-width: 120px; max-width: 140px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="height: 25px; line-height: 25px;"]')
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		const placedDown = cy
			.get(
				'[data-qa-id="orders-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
			)
			.get(
				'[style="flex: 0 1 140px; min-width: 120px; max-width: 140px; display: flex; justify-content: flex-end;"]'
			)
			.get(
				'[style="flex: 0 1 140px; min-width: 120px; max-width: 140px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
			.click()
			.get('div.table-vir__row-odd')
			.within(() => {
				cy.get('span.table-vir__cell')
					.first()
					.get('[style="height: 25px; line-height: 25px;"]')
					.should(($val) => {
						expect($val).not.to.be.null
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
				const msgCancel = cy.waitUntil(() =>
					cy.get('.notification-text__text').should('be.visible')
				)
				const verifyMsg = cy.waitUntil(() =>
					cy.get('.notification-text__text').should('contain', `has been canceled`)
				)
			})
		return this
	}
}
export default buyScaled
