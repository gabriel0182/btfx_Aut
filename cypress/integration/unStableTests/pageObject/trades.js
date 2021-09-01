class trades {
	static validateMarket() {
		cy.waitUntil(() =>
			cy
				.get('.trades-table__header')
				.within(() => {
					cy.get('.trades-table__header-cell').eq(1).invoke('text').should('contain', 'Time')
				})
				.get('.trades-table__header')
				.within(() => {
					cy.get('.trades-table__header-cell').eq(2).invoke('text').should('contain', 'Price')
				})
				.get('.trades-table__header')
				.within(() => {
					cy.get('.trades-table__header-cell').eq(3).invoke('text').should('contain', 'Amount')
				})
				.get('.trades-table')
				.invoke('css', 'background-color')
				.then((background) => {
					cy.get('div.trades-table')
						.invoke('attr', 'style', `background-color: ${background}`)
						.then((element) => {
							expect(element).to.have.css('background-color', background)
						})
				})
				.should('have.css', 'color', 'rgb(255, 255, 255)')
		)
	}
	static validateYours() {
		cy.get('#trades-toggle').contains('Yours').click()
		cy.get('.trades-table__header')
			.within(() => {
				cy.get('.trades-table__header-cell').eq(1).invoke('text').should('contain', 'Time')
			})
			.get('.trades-table__header')
			.within(() => {
				cy.get('.trades-table__header-cell').eq(2).invoke('text').should('contain', 'Price')
			})
			.get('.trades-table__header')
			.within(() => {
				cy.get('.trades-table__header-cell').eq(3).invoke('text').should('contain', 'Amount')
			})
		cy.get('div.trades-table').should('have.css', 'color', 'rgb(255, 255, 255)')
	}
}
export default trades
