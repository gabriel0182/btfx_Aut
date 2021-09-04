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

	static marginBalanceAvailable() {
		cy.get('.USD')
			.parents('[data-qa-id="balancesTable-row"]')
			.find('[data-qa-id="balancesTable-row-cell"]')
			.eq(2)
			.find('.avail')
			.as('availableMarginBalance')

		cy.get('@availableMarginBalance').then(($val) => {
			const txt = $val.text()
			let availableMarginBalance = Number(txt.replace(/[^0-9\.-]+/g, ''))
			expect(availableMarginBalance).greaterThan(0)
		})
	}
}
export default balance
