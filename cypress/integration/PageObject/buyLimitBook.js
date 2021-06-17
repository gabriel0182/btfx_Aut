class buyLimitBook {
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
			.each($div => {
				cy.get('#book-asks > .book__rows > :nth-child(1)')
				cy.get(
					'#book-asks > .book__rows > :nth-child(1) > .book__row > :nth-child(4) > span'
				).click()
			})
		const btc = cy.get('.order-errors').get('.order-errors__wrapper').get('li')
		btc.should('contain', 'Amount BTC must be a number')
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
				cy.get('#orderFormDropdownItem_limitbook')
					.get('[data-qa-id="order-form__order-type-dropdown-menu-item-limitbook"]')
					.click()
			})
		)
		const wallet = cy.get('#form-choose-exchange').get('#form-choose-exchange > span').click()
		const TIF = cy.get(':nth-child(4) > .ui-labeledcheckbox__container > label')
		TIF.should('be.visible')
		const OCO = cy.get(
			'.orderform__options > :nth-child(1) > .ui-labeledcheckbox__container > label'
		)
		OCO.should('be.visible')
		const hidden = cy.get(
			'.orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label'
		)
		hidden.should('be.visible')
		const postOnly = cy.get(':nth-child(3) > .ui-labeledcheckbox__container > label')
		postOnly.should('be.visible')
		const marginWallet = cy.get('#form-choose-margin')
		cy.get('#form-choose-margin > span')
		marginWallet.click()
		const TIFMargin = cy.get(':nth-child(4) > .ui-labeledcheckbox__container > label')
		TIFMargin.should('be.visible')
		const reduceOnly = cy.get(':nth-child(4) > .ui-labeledcheckbox__container > label')
		reduceOnly.should('be.visible')
		const OCOMargin = cy.get(
			'.orderform__options > :nth-child(1) > .ui-labeledcheckbox__container > label'
		)
		OCOMargin.should('be.visible')
		const hiddenMargin = cy.get(
			'.orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label'
		)
		hiddenMargin.should('be.visible')
		const postOnlyMargin = cy.get(':nth-child(3) > .ui-labeledcheckbox__container > label')
		postOnlyMargin.should('be.visible')
		const reduceOnlyMargin = cy.get(':nth-child(5) > .ui-labeledcheckbox__container > label')
		reduceOnlyMargin.should('be.visible')
		const walletExch = cy.get('#form-choose-exchange')
		cy.get('#form-choose-exchange > span').click()
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
				const searchTicker = cy.get('#ticker-search-input')
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
				.each($div => {
					cy.get('#book-asks > .book__rows > :nth-child(1)')
					cy.get(
						'#book-asks > .book__rows > :nth-child(1) > .book__row > :nth-child(4) > span'
					).click()
				})
			return this
		})
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
							`Exchange limit buy order of ${data.btc} BTC has been fully executed`
						)
				)
			})
		})
		return this
	}
}
export default buyLimitBook
