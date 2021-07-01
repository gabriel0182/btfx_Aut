class buyFillKill {
	static trading() {
		cy.get('.header__nav-buttons-wrapper').within(() => {
			cy.get('[data-qa-id="header-link-trading"]').should('be.visible').click()
		})
		cy.get('.book__main').within(() => {
			cy.get('#book-bids').should('be.visible')
			cy.get('#book-asks').should('be.visible')
		})
	}
	static requiredFields() {
		const orderErrors = ['Price USD must be a number', 'Amount BTC must be a number']
		cy.get('#buyButton').click()
		cy.get('.order-errors').within(() => {
			cy.get('ul>li').each((element, index) => {
				cy.wrap(element).should('be.visible').invoke('text').should('include', orderErrors[index])
			})
		})
	}
	static verifyFields() {
		cy.get('[data-qa-id="order-form__order-type-dropdown"]').click()
		cy.get('[data-qa-id="order-form__order-type-dropdown-menu"]').within(() => {
			cy.get('[data-qa-id="order-form__order-type-dropdown-menu-item-fillorkill"]').click()
		})

		cy.get('#form-choose-margin').click()
		cy.get('.orderform__field').within(() => {
			cy.get('[data-qa-id="reduceOnly-checkbox-label"]').should('be.visible')
		})
	}
	static orderInfo() {
		cy.fixture('orders').then((order) => {
			context(`Generating a test for ${order[0].wallet1}`, () => {
				cy.get('#orderform-panel').should('be.visible').should('exist')
				cy.get('#ticker-search-input').type(`${order[0].ticker}{enter}`)
				cy.get('[data-qa-id="ticker-list-pair-filter"]').click()
				cy.get('[data-qa-id="ticker-list-pair-filter-menu"]').within(() => {
					cy.get('[id="Item_USD"]').click()
				})

				cy.get('.tickerlist__container').within(() => {
					cy.get('.tickerlist__lastprice').as('currencyLastPrice')
					cy.get('@currencyLastPrice').should('have.attr', 'href').and('include', '/t/BTC:USD')
					cy.get('@currencyLastPrice').click()
					cy.wait('@allSymbols').its('response.statusCode').should('eq', 200)
				})

				cy.get('#book-asks')
					.find('.book__row')
					.first()
					.children(4)
					.find('span')
					.eq(2)
					.then(($btn) => {
						const txt = $btn.text()
						var pointNum = Number(txt.replace(/[^0-9\.-]+/g,''))
						let amount = pointNum + 1000
						cy.get('[name="price"]').as('distanceUSD')
						cy.get('@distanceUSD').type(amount)
						cy.get('[name="amount"]').as('amountBTC')
						cy.get('@amountBTC').type(order[0].btc)
						cy.get('#form-choose-exchange').contains(order[0].wallet1).as('orderFrom')
						cy.get('@orderFrom').click()
					})
			})
		})
	}
	static buyButton() {
		cy.get('#buyButton').click()
		cy.get('[data-qa-id="modal-dialog"]').within(() => {
			cy.get('[data-qa-id="modal-dialog-action-button"]').contains('Okay').click()
		})
	}
	static successMsg() {
		cy.fixture('orders').then((order) => {
			context(`Generating a test for ${order[0].price}`, () => {
				const confirmationMsg = `Exchange fok buy order of ${order[0].btc} BTC has been fully executed`
				cy.waitUntil(() => cy.get('.notification-text__text').should('be.visible'))
				cy.waitUntil(() => cy.get('.notification-text__text').should('contain', confirmationMsg))
			})
		})
	}
}
export default buyFillKill
