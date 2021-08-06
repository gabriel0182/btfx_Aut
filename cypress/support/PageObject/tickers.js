class tickers {
	static selectTicker() {
		cy.fixture('orders').then((trading) => {
			cy.waitUntil(() => cy.get('#orderform-panel').should('be.visible').should('exist'))
			cy.get('input#ticker-textinput-id').type(`${trading[0].ticker}{enter}`)
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
		})
		cy.get('.main-ticker__container').should('be.visible').should('contain', 'BTC/USD')
		cy.get('[data-qa-id="chart-widget"]').within(() => {
			cy.get('span.show50').should('be.visible').and('contain', 'BTC/USD')
		})
	}
	static tickerPairFilter() {
		cy.get('[data-qa-id="ticker-list-pair-filter"]').click()
		cy.get('[data-qa-id="ticker-list-pair-filter-menu"]').within(() => {
			cy.get('[id="Item_UST"]').click()
		})

		cy.get('.custom-scrollbar')
			.eq(2)
			.within(() => {
				cy.get('.tickerlist__lastticker').should('contain', 'USDt')
			})
	}
	static searchTicker() {
		cy.fixture('orders').then((trading) => {
			cy.waitUntil(() => cy.get('#orderform-panel').should('be.visible').should('exist'))
			cy.get('input#ticker-textinput-id').type(`${trading[0].ticker}{enter}`)
			cy.get('[data-qa-id="ticker-list-pair-filter"]').click()
		})
		cy.get('[data-qa-id="ticker-list-pair-filter-menu"]').within(() => {
			cy.get('[id="Item_ANY"]').click()
		})
		cy.get('.custom-scrollbar')
			.eq(2)
			.within(() => {
				cy.get('.tickerlist__lastticker').should('contain', 'BTC')
			})
			cy.get('.custom-scrollbar')
			.eq(2)
			.within(() => {
				cy.get('.tickerlist__symbolcell').should('contain', 'BTC')
			})
	}
	static changeTicker(){
		cy.fixture('orders').then((trading) => {
			cy.waitUntil(() => cy.get('#orderform-panel').should('be.visible').should('exist'))
			cy.get('input#ticker-textinput-id').type(`${trading[0].ticker2}{enter}`)
			cy.get('[data-qa-id="ticker-list-pair-filter"]').click()
		})
		cy.get('[data-qa-id="ticker-list-pair-filter-menu"]').within(() => {
			cy.get('[id="Item_USD"]').click()
		})
		cy.get('.custom-scrollbar')
			.eq(2)
			.within(() => {
				cy.get('.tickerlist__lastticker').should('contain', 'USD')
			})
			cy.get('.custom-scrollbar')
			.eq(2)
			.within(() => {
				cy.get('.tickerlist__symbolcell').should('contain', 'ETH')
			})
			cy.get('.tickerlist__container').within(() => {
				cy.get('.tickerlist__lastprice').eq(1).as('currencyLastPrice')
				cy.get('@currencyLastPrice').should('have.attr', 'href').and('include', '/t/ETH:USD')
				cy.get('@currencyLastPrice').click()
			})
			cy.url().should('contain','t/ETH:USD?type=exchange')
	}
}
export default tickers
