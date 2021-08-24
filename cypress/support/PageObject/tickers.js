class tickers {
	static selectTicker() {
		cy.fixture('orders').then((trading) => {
			cy.waitUntil(() => cy.get('#orderform-panel').should('be.visible').should('exist'))
			cy.get('input#ticker-textinput-id').clear().type(`${trading[0].ticker}{enter}`)
			cy.get('[data-qa-id="ticker-list-pair-filter"]').click()

			cy.get('[data-qa-id="ticker-list-pair-filter-menu"]').within(() => {
				cy.get('[id="Item_USD"]').click()
			})

			cy.get('.tickerlist__container').within(() => {
				cy.get('.tickerlist__lastprice').as('currencyLastPrice')
				cy.get('@currencyLastPrice').should('have.attr', 'href').and('include', '/t/BTC:USD')
				cy.get('@currencyLastPrice').click()
			})
		})
		cy.get('.main-ticker__container').should('be.visible').should('contain', 'BTC/USD')
		cy.get('[data-qa-id="chart-widget"]').within(() => {
			cy.get('span.show50').should('be.visible').and('contain', 'BTC/USD')
		})
	}

	static selectPairFilter() {
		cy.get('[data-qa-id="ticker-list-pair-filter"]').click()
		cy.get('[data-qa-id="ticker-list-pair-filter-menu"]').within(() => {
			cy.get('[id="Item_UST"]').click()
		})
	}
	static tickerPairFilter() {
		cy.get('.custom-scrollbar')
			.eq(2)
			.within(() => {
				cy.get('.tickerlist__lastticker').should('contain', 'USDt')
			})
	}
	static searchTicker() {
		cy.fixture('orders').then((trading) => {
			cy.waitUntil(() => cy.get('#orderform-panel').should('be.visible').should('exist'))
			cy.get('input#ticker-textinput-id').clear().type(`${trading[0].ticker}{enter}`)
			cy.get('[data-qa-id="ticker-list-pair-filter"]').click()
		})
		cy.get('[data-qa-id="ticker-list-pair-filter-menu"]').within(() => {
			cy.get('[id="Item_ANY"]').click()
		})
	}
	static btcTickerList() {
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
	static changeTicker() {
		cy.fixture('orders').then((trading) => {
			cy.waitUntil(() => cy.get('#orderform-panel').should('be.visible').should('exist'))
			cy.get('input#ticker-textinput-id').clear().type(`${trading[0].ticker2}{enter}`)
			cy.get('[data-qa-id="ticker-list-pair-filter"]').click()
		})
		cy.get('[data-qa-id="ticker-list-pair-filter-menu"]').within(() => {
			cy.get('[id="Item_USD"]').click()
		})
	}
	static validateURL() {
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
			cy.get('.custom-scrollbar').last().get('[href="/t/ETH:USD"]').eq(1).as('currencyLastPrice')
			cy.get('@currencyLastPrice').click()
		})
		cy.url().should('contain', 't/ETH:USD?type=exchange')
	}
	static volumeAmount() {
		cy.get('.show-soft')
			.eq(6)
			.next()
			.then(($val) => {
				const txt = $val.text()
				var max = Number(txt.replace(/[^0-9\.-]+/g, ''))
				cy.log(max)
				cy.get('.show-soft')
					.eq(5)
					.next()
					.then(($val2) => {
						const txt = $val2.text()
						var min = Number(txt.replace(/[^0-9\.-]+/g, ''))
						cy.wrap(min).should('be.lte', max)
						//expect(min).to.be.lessThanOrEqual(max)
					})
			})
	}
	static addFavoriteBTCUSD() {
		cy.fixture('orders').then((trading) => {
			cy.waitUntil(() => cy.get('#orderform-panel').should('be.visible').should('exist'))
			cy.get('input#ticker-textinput-id').clear().type(`${trading[0].ticker}{enter}`)
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
		cy.get('.tickerlist__star')
			.first()
			.within(() => {
				cy.get('.fa-star-o').click()
			})
	}
	static favoriteBlueBTCUSD() {
		cy.get('.tickerlist__star')
			.first()
			.within(() => {
				cy.get('.bfx-blue').should('be.visible')
			})
	}
	static removeFavoriteBTCUSD() {
		cy.get('.tickerlist__star')
			.first()
			.within(() => {
				cy.get('.bfx-blue').should('be.visible').click()
			})
	}
	static notBlueBTCUSD() {
		cy.get('.tickerlist__star')
			.first()
			.within(() => {
				cy.get('.fa-star-o').should('be.visible')
			})
	}
	static setOnlyFavorites() {
		cy.get('#tickerlist-fav-filter').click()
	}
	static viewOnlyFavorites() {
		cy.get('.tickerlist__container').within(() => {
			cy.get('.tickerlist__lastprice').as('currencyLastPrice')
			cy.get('@currencyLastPrice').should('have.attr', 'href').and('include', '/t/BTC:USD')
		})
	}
	static removeFavorites() {
		cy.get('#tickerlist-fav-filter').click()
		cy.get('.tickerlist__star')
			.first()
			.within(() => {
				cy.get('.bfx-blue').should('be.visible').click()
			})
	}
	static enableMarginOnly() {
		cy.on('uncaught:exception', (err, runnable) => {
			expect(err.message).to.include('')
			return false
		})
		cy.get('#ticker-textinput-id').clear()
		cy.get('[data-qa-id="ticker-list-pair-filter"]').click()
		cy.get('[data-qa-id="ticker-list-pair-filter-menu"]').within(() => {
			cy.get('[id="Item_ANY"]').click()
		})
		cy.get('#tickerlist-margin-filter').click()
		cy.get('.ui-tooltip--cursor-help')
			.eq(5)
			.within(() => {
				cy.get('.bfx-blue').should('be.visible')
			})
	}
	static displayMarginEnabled() {
		cy.get('.tickerlist__container').within(() => {
			cy.get('.table-vir__row').each((tr) => {
				cy.wrap(tr).find('.bfx-blue').should('be.visible')
			})
		})
	}
	static disableMarginOnly() {
		cy.on('uncaught:exception', (err, runnable) => {
			expect(err.message).to.include('')
			return false
		})
		cy.get('#tickerlist-margin-filter').click()
	}
	static displayAll() {
		cy.get('.tickerlist__container').within(() => {
			cy.get('.table-vir__row').each((tr) => {
				cy.wrap(tr).get('.tickerlist__icons-cell').should('be.visible')
			})
		})
		cy.get('.tickerlist__container').within(() => {
			cy.get('.table-vir__row').each((tr) => {
				cy.wrap(tr).get('.bfx-blue').should('be.visible')
			})
		})
	}
}
export default tickers
