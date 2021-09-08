import orderBook from '../PageObject/orderBook'
class tickers {
	static selectCurrencyPair(currencyPair) {
		let currencyPairArray = currencyPair.split(':')
		const baseCurrency = currencyPairArray[0]
		const quoteCurrency = currencyPairArray[1]

		this.searchTicker(baseCurrency)
		this.selectPairFilter(quoteCurrency)
		this.clickOnTicker(baseCurrency)
		this.validateURL(currencyPair)
	}

	static selectPairFilter(currency) {
		cy.get('[data-qa-id="ticker-list-pair-filter"]').click()
		cy.get('[data-qa-id="ticker-list-pair-filter-menu"]').within(() => {
			if (currency === 'USDt') {
				cy.get('[data-qa-id="ticker-list-pair-filter-menu-item-UST"]').click()
			} else if (currency === 'EURt') {
				cy.get('[data-qa-id="ticker-list-pair-filter-menu-item-EUT"]').click()
			} else {
				cy.get(`[data-qa-id="ticker-list-pair-filter-menu-item-${currency}"]`).click()
			}
		})
	}
	static lastTickerListContains(currency) {
		cy.get('.custom-scrollbar')
			.eq(2)
			.within(() => {
				cy.get('.tickerlist__lastticker').should('contain', currency)
			})
	}
	static symbolTickerListContains(currency) {
		cy.get('.custom-scrollbar')
			.eq(2)
			.within(() => {
				cy.get('.tickerlist__symbolcell').should('contain', currency)
			})
	}
	static searchTicker(currency) {
		cy.get('[data-qa-id="ticker-list-search-input"]').clear().type(`${currency}`)
	}
	static tickerListContains(currency) {
		this.lastTickerListContains(currency)
		this.symbolTickerListContains(currency)
	}
	static clickOnTicker(currency) {
		cy.get('.tickerlist__container').within(() => {
			cy.get('.table-vir__row')
				.contains(new RegExp(`^${currency}$`, 'g'), { matchCase: false })
				.click()
		})
	}

	static validateURL(currencyPair) {
		cy.url().should('include', `/t/${currencyPair}`)
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
