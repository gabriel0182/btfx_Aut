
class trades {
	static addedMarketRow() {
		cy.waitUntil(()=>
			cy.get('.notification__icon-wrapper').should('be.visible')
			.get('.notification__content').should('be.visible')
		)
		cy.get('.trades-table__row').first().should('be.visible')
	}
	static rowGreenBackgroundColour() {
		cy.get('.trades-table__row')
			.first()
			.should('have.css', 'background-color', 'rgba(1, 167, 129, 0.1)')
	}

	static containsTradeAmount() {
		cy.fixture('orders').then((btc) => {
			cy.get('.trades-table__row')
				.first()
				.within(() => {
					cy.get('.virtable__cellwrapper--rightalign')
						.last()
						.invoke('text')
						.should('contain', `${btc[0].btc}`)
				})
		})
	}

	static containsTradePrice() {
		const bookPrice = cy
			.get('.book__row--reversed')
			.children('div')
			.eq(5)
			.then(($val) => {
				const txt = $val.text()
				cy.get('.trades-table__row')
					.first()
					.within(() => {
						cy.get('span').eq(1).invoke('text').should('contain', txt)
					})
			})
	}
	static buyTradeGreenUpIcon() {
		cy.get('.trades-table__row')
			.first()
			.within(() => {
				cy.get('.buying-icon').should('have.css', 'color', 'rgb(1, 167, 129)')
			})
	}
	static containsTradeTime() {
		cy.get('.trades-table__row')
			.children('div')
			.eq(1)
			.then(($val) => {
				const txt = $val.text()
				cy.get('.trades-table__row')
					.first()
					.within(() => {
						cy.get('span').eq(0).invoke('text').should('contain', txt)
					})
			})
	}
}
export default trades
