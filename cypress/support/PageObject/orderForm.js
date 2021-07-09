///  <reference types="cypress"/>
const apiStagingUrl = 'https://api.staging.bitfinex.com'

class orderform {
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
	static selectLimitOrder() {
		cy.waitUntil(() =>
			cy
				.get(':nth-child(1) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap')
				.click()
				.get('ul.dropdown-content')
		)
		cy.waitUntil(() =>
			cy.get('ul.dropdown-content').within(() => {
				cy.get('#orderFormDropdownItem_limit')
					.get('[data-qa-id="order-form__order-type-dropdown-menu-item-limit"]')
					.click()
			})
		)
	}
	static selectExchangeWallet() {
		cy.get('[data-qa-id="order-form"]').within(() => {
			cy.get('div#form-choose-exchange').contains('Exchange').click()
		})
	}
	static selectMarginWallet() {
		cy.get('[data-qa-id="order-form"]').within(() => {
			cy.get('div#form-choose-margin').contains('Margin').click()
		})
	}
	static verifyLimitExchangeFields() {
		cy.waitUntil(() =>
			cy.get('div.ui-labeledcheckbox__container').within(() => {
				cy.contains('OCO').should('be.visible')
				cy.get('[data-qa-id="hidden-checkbox-label"]').should('be.visible')
				cy.get('[data-qa-id="postonly-checkbox-label"]').should('be.visible')
				cy.get('[data-qa-id="tif-checkbox-label"]').should('be.visible')
			})
		)
	}
	static verifyLimitMarginFields() {
		cy.waitUntil(() =>
			cy.get('div.ui-labeledcheckbox__container').within(() => {
				cy.contains('OCO').should('be.visible')
				cy.get('[data-qa-id="hidden-checkbox-label"]').should('be.visible')
				cy.get('[data-qa-id="postonly-checkbox-label"]').should('be.visible')
				cy.get('[data-qa-id="tif-checkbox-label"]').should('be.visible')
				cy.get('[data-qa-id="reduceOnly-checkbox-label"]').should('be.visible')
			})
		)
	}
	static verifyLimitRequiredFields() {
		cy.get('div.orderform')
			.within(() => {
				cy.get('#buyButton').click()
			})
			.get('.order-errors')
			.get('ul.order-errors__wrapper')
			.eq(0)
			.should('contain', 'Price USD must be a number')
			.should('contain', 'Amount BTC must be a number')
	}
	static validateMin() {
		cy.intercept('GET', 'https://api-pub.staging.bitfinex.com/v2/tickers?symbols=ALL').as(
			'orderType'
		)
		cy.wait('@orderType').its('response.statusCode').should('eq', 200)
		cy.fixture('orders').then((min) => {
			cy.waitUntil(() =>
				cy
					.get('[name="amount"]')
					.type(`${min[0].min}`)
					.get('div.bid')
					.within(() => {
						cy.get('span').eq(2).click()
					})
					.get('div.orderform')
					.within(() => {
						cy.get('#buyButton').click()
					})
			)
			cy.waitUntil(() =>
				cy
					.get('.notification-text__text')
					.should('contain', `Invalid order: minimum size for BTC/USD`)
			)
		})
	}
	static validateMax() {
		cy.fixture('orders').then((max) => {
			cy.waitUntil(() =>
				cy
					.get('[name="amount"]')
					.clear()
					.type(`${max[0].max}`)
					.get('div.bid')
					.within(() => {
						cy.get('span').eq(2).click()
					})
					.get('div.orderform')
					.within(() => {
						cy.get('#buyButton').click()
					})
			)
			cy.waitUntil(() =>
				cy
					.get('.notification-text__text')
					.should('contain', `Invalid order: maximum size for BTC/USD`)
			)
		})
	}
	static validateMaxPrice() {
		cy.fixture('orders').then((max) => {
			cy.waitUntil(() =>
				cy.get('div#book-asks').within(() => {
					cy.get('div.book__row.book__row--reversed').first().get('span').eq(4).click()
				})
			)
			cy.waitUntil(() => cy.get('[name="price"]').clear({ force: true }).type(`${max[0].max}`))
				.get('div.orderform')
				.within(() => {
					cy.get('#buyButton').click()
				})
			cy.waitUntil(() =>
				cy
					.get('.order-errors')
					.get('ul.order-errors__wrapper')
					.should('contain', `Price set at more than 10% of the ticker price, aborting`)
			)
		})
	}
}
export default orderform
