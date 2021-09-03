class trades {
	static addedMarketRow() {
		cy.waitUntil(() =>
			cy
				.get('.notification__icon-wrapper')
				.should('be.visible')
				.get('.notification__content')
				.should('be.visible')
		)
		cy.get('.trades-table__row').first().should('be.visible')
	}
	static getColorSelector(color) {
		const colors = {
			Green: 'rgba(1, 167, 129, 0.1)',
			Red: 'rgba(228, 75, 68, 0.1)',
		}
		return colors[color]
	}
	static getIconSelector(icon) {
		const icons = {
			Up: '.buying-icon',
			Down: '.selling-icon',
		}
		return icons[icon]
	}
	static getIconColorSelector(iconColor) {
		const iconColors = {
			Green: 'rgb(1, 167, 129)',
			Red: 'rgb(228, 75, 68)',
		}
		return iconColors[iconColor]
	}
	static validateRowBackgroundColor(color) {
		const colorSelector = this.getColorSelector(color)
		cy.get('.trades-table__row').first().should('have.css', 'background-color', `${colorSelector}`)
	}
	static validateTradeUpDownIcon(iconColors,icon) {
		const colorSelector = this.getIconColorSelector(iconColors)
		const iconSelector = this.getIconSelector(icon)
		cy.get('.trades-table__row')
			.first()
			.within(() => {
				cy.get(iconSelector).should('have.css', 'color',  `${colorSelector}`)
			})
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

	static containsTradeBuyPrice() {
		cy
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
	static containsTradeSellPrice() {
		cy
			.get('.book__row')
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
