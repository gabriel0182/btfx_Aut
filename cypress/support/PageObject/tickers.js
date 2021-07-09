class tickers {
	static selectTicker() {
		cy.fixture('orders').then((trading) => {
			cy.waitUntil(() => cy.get('#orderform-panel').should('be.visible').should('exist'))
			cy.get('#ticker-search-input').type(`${trading[0].ticker}{enter}`)
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
}
export default tickers
