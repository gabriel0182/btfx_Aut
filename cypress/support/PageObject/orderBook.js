const apiStagingUrl = 'https://api.staging.bitfinex.com'

class orderBook {
	static isVisible() {
		cy.waitUntil(() =>
			cy.get('.book__main').within(() => {
				cy.get('#book-bids').find('.book__rows').should('be.visible')
				cy.get('#book-asks').find('.book__rows').should('be.visible')
			})
		)
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
	static addAlert(bidAsk) {
		cy.intercept('POST', `${apiStagingUrl}/v2/auth/w/alert/set`).as('setAlert')

		cy.get(`#book-${bidAsk}s`).within(() => {
			cy.get('.book__row').last().find('.book__alert').click()
			cy.wait('@setAlert').its('response.statusCode').should('eq', 200)
		})
	}
	static removeAlert(bidAsk) {
		cy.intercept('POST', `${apiStagingUrl}/v2/auth/w/alert/**/del`).as('removeAlert')

		cy.get(`#book-${bidAsk}s`).within(() => {
			cy.get('.book__row').last().find('.book__alert').click()
			cy.wait('@removeAlert').its('response.statusCode').should('eq', 200)
		})
	}
	static bellIconIsDisplayed(bidAsk) {
		cy.get(`#book-${bidAsk}s`).within(() => {
			cy.get('.book__row').last().find('.book__alert').should('be.visible')
		})
	}
	static bellIconIsHidden(bidAsk) {
		cy.get(`#book-${bidAsk}s`).within(() => {
			cy.get('.book__row').last().find('.book__alert').should('be.hidden')
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
	static validateMarkers() {
		cy.fixture('orders').then((btc) => {
			cy.waitUntil(() =>
				cy
					.get('div.book__main')
					.get('#book-bids')
					.within(() => {
						cy.get('div.book__order-i.book__order-green').should('be.visible')
					})
					.get('div.book__order-i.book__order-green')
					.trigger('mouseover')
					.get('div.book__order-tooltip')
					.invoke('show')
					.should('contain', 'EXCHANGE LIMIT')
					.get('div.book__order-tooltip > span')
					.should('contain', `${btc[0].btc}`)
			)
		})
	}
	static validatePriceHighestBid() {
		cy.get('#book-bids')
			.find('.book__row')
			.first()
			.find('span')
			.last()
			.then(($val) => {
				const value = $val.text()
				let maxBid = Number(value.replace(/[^0-9\.-]+/g, ''))
				cy.get('[name="price"]').should('contain.value', `${maxBid}`)
			})
	}
}
export default orderBook
