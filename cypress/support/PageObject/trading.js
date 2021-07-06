///  <reference types="cypress"/>

const apiStagingUrl = 'https://api.staging.bitfinex.com'

class trading {
	static currency() {
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
	}

	static bookZoomAdd() {
		for (let n = 0; n < 10; n++) {
			cy.get('#book-agg-controls').within(() => {
				cy.get('span').eq(5).click()
			})
		}
		cy.waitUntil(() =>
			cy.get('#book-bids').within(() => {
				cy.get('.book__row')
					.first()
					.invoke('css', 'background-color')
					.then((background) => {
						cy.get('span')
							.eq(4)
							.invoke('attr', 'style', `background-color: ${background}`)
							.then((element) => {
								expect(element).to.have.css('background-color', background)
							})
					})
			})
		)
	}

	static bookZoomReduce() {
		for (let n = 0; n < 10; n++) {
			cy.get('#book-agg-controls').within(() => {
				cy.get('span').eq(4).click()
			})
		}
		cy.waitUntil(() =>
			cy.get('#book-bids').within(() => {
				cy.get('.book__row')
					.first()
					.invoke('css', 'background-color')
					.then((background) => {
						cy.get('span')
							.eq(4)
							.invoke('attr', 'style', `background-color: ${background}`)
							.then((element) => {
								expect(element).to.have.css('background-color', background)
							})
					})
			})
		)
	}

	static verifyCurrency() {
		cy.get('[data-qa-id="chart-widget"]').within(() => {
			cy.get('span.show50').should('be.visible').and('contain', 'BTC/USD')
		})
	}

	static addAlert() {
		cy.intercept('POST', `${apiStagingUrl}/v2/auth/w/alert/set`).as('setAlert')
		cy.intercept('POST', `${apiStagingUrl}/v2/auth/w/alert/**/del`).as('deleteAlert')

		cy.get('#book-bids').within(() => {
			cy.get('.book__row').first().find('.book__alert').click()
			cy.wait('@setAlert').its('response.statusCode').should('eq', 200)
		})

		cy.get('.notification-text__text').should('contain', 'Added new price alert BTC/USD')

		cy.get('div.notification__skip').click()

		cy.get('#book-bids').within(() => {
			cy.get('.book__row').first().find('.book__alert').click()
			cy.wait('@deleteAlert').its('response.statusCode').should('eq', 200)
		})

		cy.get('.notification-text__text').should('contain', 'Removed price alert BTC/USD')

		cy.get('div.notification__skip').click()

		cy.get('#book-asks').within(() => {
			cy.get('.book__row').first().find('.book__alert').click()
			cy.wait('@setAlert').its('response.statusCode').should('eq', 200)
		})

		cy.get('.notification-text__text').should('contain', 'Added new price alert BTC/USD')

		cy.get('div.notification__skip').click()

		cy.get('#book-asks').within(() => {
			cy.get('.book__row').first().find('.book__alert').click()
			cy.wait('@deleteAlert').its('response.statusCode').should('eq', 200)
		})

		cy.get('.notification-text__text').should('contain', 'Removed price alert BTC/USD')
	}

	static checkBestValue() {
		cy.intercept('GET', 'https://api-pub.staging.bitfinex.com/v2/tickers?symbols=ALL').as('trading')
		cy.wait('@trading').its('response.statusCode').should('eq', 200)

		cy.get('.ui-buysellinputindicator')
			.first()
			.within(() => {
				cy.get('i').first().click()
			})

		cy.get('span.ui-fieldlabel__innertag')
			.contains('Bid')
			.next('span')
			.then(($val) => {
				const txt = $val.text()
				let pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
				cy.get('#priceinput1').should('contain.value', `${pointNum}`)
			})

		cy.get('.ui-buysellinputindicator')
			.first()
			.within(() => {
				cy.get('i').last().click()
			})

		cy.get('span.ui-fieldlabel__innertag')
			.contains('Ask')
			.next('span')
			.then(($val) => {
				const txt = $val.text()
				let pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
				cy.get('#priceinput1').should('contain.value', `${pointNum}`)
			})
	}

	static checkMaxValue() {
		cy.intercept('POST', `${apiStagingUrl}/v2/auth/calc/order/avail`).as('amountAvailable')
		cy.get('#priceinput1').clear().type('1')
		cy.get('.ui-buysellinputindicator')
			.last()
			.within(() => {
				cy.get('i').first().click()
				cy.wait('@amountAvailable').its('response.statusCode').should('eq', 200)
			})

		cy.get('#balances-search-input').clear().type('USD')
		cy.get('[data-qa-id="balancesTable-row"]')
			.contains(new RegExp('^USD$', 'g'))
			.parents('[data-qa-id="balancesTable-row-cell"]')
			.next()
			.find('.avail')
			.then(($val) => {
				const txt = $val.text()
				let pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
				cy.get('#amountinput2').should('contain.value', pointNum)
				cy.get('div.ui-buysellinputindicator')
					.last()
					.within(() => {
						cy.get('i').last().click()
						cy.wait('@amountAvailable').its('response.statusCode').should('eq', 200)
					})
			})

		cy.get('#balances-search-input').clear().type('BTC')
		cy.get('[data-qa-id="balancesTable-row"]')
			.contains('BTC')
			.parents('[data-qa-id="balancesTable-row-cell"]')
			.next()
			.find('.avail')
			.then(($val) => {
				const txt = $val.text()
				var pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
				cy.get('#amountinput2').should('contain.value', pointNum)
			})
	}

	static increaseDecreasePrecision() {
		cy.intercept('POST', `${apiStagingUrl}/v2/auth/w/settings/set`).as('setSetting')

		for (let n = 0; n < 2; n++) {
			cy.get('#book-agg-controls').within(() => {
				cy.get('span').eq(0).click()
				cy.wait('@setSetting').its('response.statusCode').should('eq', 200)
			})
			cy.waitUntil(() =>
				cy.get('#book-bids').within(() => {
					cy.get('.book__row').first().should('be.visible')
				})
			)
			cy.waitUntil(() =>
				cy.get('#book-asks').within(() => {
					cy.get('.book__row').first().should('be.visible')
				})
			)
		}
		for (let n = 0; n < 2; n++) {
			cy.get('span#book-agg-controls').within(() => {
				cy.get('span').eq(1).click()
				cy.wait('@setSetting').its('response.statusCode').should('eq', 200)
			})
			cy.waitUntil(() =>
				cy.get('#book-bids').within(() => {
					cy.get('.book__row').first().should('be.visible')
				})
			)
			cy.waitUntil(() =>
				cy.get('#book-asks').within(() => {
					cy.get('.book__row').first().should('be.visible')
				})
			)
		}
	}
}
export default trading
