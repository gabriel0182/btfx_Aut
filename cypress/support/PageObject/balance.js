class balance {
	static isVisible() {
		cy.get('[data-qa-id="balances-widget"]').should('be.visible')
	}

	static search(currency) {
		cy.get('.balances__controls').within(() => {
			cy.get('.textinputsearch__search').type(currency)
		})
	}

	static validateSearchResult(currencySymbol) {
		cy.get('[data-qa-id="balancesTable-row-cell"]')
			.first()
			.find('span')
			.contains(currencySymbol)
			.should('be.visible')
	}
}
export default balance
