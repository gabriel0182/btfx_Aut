const apiStagingUrl = 'https://api.staging.bitfinex.com'

class orderform {
	static checkMaxValue() {
		cy.intercept('POST', `${apiStagingUrl}/v2/auth/calc/order/avail`).as('amountAvailable')
		cy.get('[name="price"]').clear({ force: true }).type('1')
		cy.get('.ui-buysellinputindicator')
			.last()
			.within(() => {
				cy.get('i').first().click()
				cy.wait('@amountAvailable').its('response.statusCode').should('eq', 200)
			})

		cy.get('input.textinputsearch__searchinput').eq(1).clear().type('USD')
		cy.get('[data-qa-id="balancesTable-row"]')
			.contains(new RegExp('^USD$', 'g'))
			.parents('[data-qa-id="balancesTable-row-cell"]')
			.next()
			.find('.avail')
			.then(($val) => {
				const txt = $val.text()
				let pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
				cy.get('[name="amount"]').should('contain.value', pointNum)
				cy.get('div.ui-buysellinputindicator')
					.last()
					.within(() => {
						cy.get('i').last().click()
						cy.wait('@amountAvailable').its('response.statusCode').should('eq', 200)
					})
			})

		cy.get('input.textinputsearch__searchinput').eq(1).clear().type('BTC')
		cy.get('[data-qa-id="balancesTable-row"]')
			.contains('BTC')
			.parents('[data-qa-id="balancesTable-row-cell"]')
			.next()
			.find('.avail')
			.then(($val) => {
				const txt = $val.text()
				var pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
				cy.get('[name="amount"]').should('contain.value', pointNum)
			})
	}
	static selectExchangeTab() {
		cy.get('[data-qa-id="order-form"]').within(() => {
			cy.get('div#form-choose-exchange').contains('Exchange').click()
		})
	}
	static selectMarginTab() {
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
		cy.get('[name="amount"]').clear({ force: true }).get('[name="price"]').clear({ force: true })
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
		cy.get('[name="amount"]').clear({ force: true }).get('[name="price"]').clear({ force: true })
		cy.get('div.orderform')
		cy.fixture('orders')
			.then((min) => {
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
			.get('div.orderform')
			.within(() => {
				cy.get('#sellButton').click()
			})
		cy.waitUntil(() =>
			cy
				.get('.notification-text__text')
				.should('contain', `Invalid order: minimum size for BTC/USD`)
		)
	}
	static validateMax() {
		cy.get('[name="amount"]').clear({ force: true }).get('[name="price"]').clear({ force: true })
		cy.get('div.orderform')
		cy.fixture('orders')
			.then((max) => {
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
			.get('div.orderform')
			.within(() => {
				cy.get('#sellButton').click()
			})
		cy.waitUntil(() =>
			cy
				.get('.notification-text__text')
				.should('contain', `Invalid order: maximum size for BTC/USD`)
		)
	}
	static validateMaxPrice() {
		cy.fixture('orders')
			.then((max) => {
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
			.get('div.orderform')
			.within(() => {
				cy.get('#sellButton').click()
			})
		cy.waitUntil(() => cy.get('.notification-text__text').should('contain', `Price: invalid`))
	}
	static buyLimitOrder() {
		cy.get('[data-qa-id="order-form"]').within(() => {
			cy.get('div#form-choose-exchange').contains('Exchange').click()
			cy.fixture('orders').then((btc) => {
				cy.waitUntil(() =>
					cy
						.get('[name="amount"]')
						.clear()
						.type(`${btc[0].btc}`)
						.get('div.bid')
						.within(() => {
							cy.get('span').eq(2).should('be.visible')
						})
						.then(($btn) => {
							const txt = $btn.text()
							var pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
							var amount = pointNum - 200
							cy.get('[name="price"]').clear({ force: true }).type(amount)
						})
						.get('div.orderform')
						.within(() => {
							cy.get('#buyButton').click()
						})
				)
			})
		})
	}
	static verifySellLimitRequiredFields() {
		cy.get('[name="amount"]').clear({ force: true }).get('[name="price"]').clear({ force: true })
		cy.get('div.orderform')
			.within(() => {
				cy.get('#sellButton').click()
			})
			.get('.order-errors')
			.get('ul.order-errors__wrapper')
			.eq(0)
			.should('contain', 'Price USD must be a number')
			.should('contain', 'Amount BTC must be a number')
	}
	static sellLimitOrder() {
		cy.get('[data-qa-id="order-form"]').within(() => {
			cy.get('div#form-choose-exchange').contains('Exchange').click()
			cy.fixture('orders').then((btc) => {
				cy.waitUntil(() =>
					cy
						.get('[name="amount"]')
						.clear()
						.type(`${btc[0].btc}`)
						.get('div.ask')
						.within(() => {
							cy.get('span').eq(3).should('be.visible')
						})
						.then(($btn) => {
							const txt = $btn.text()
							var pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
							var amount = pointNum + 100
							cy.get('[name="price"]').clear({ force: true }).type(amount)
						})
						.get('div.orderform')
						.within(() => {
							cy.get('#sellButton').click()
						})
				)
			})
		})
	}
	static verifyMarketRequiredFields() {
		cy.get('[name="amount"]').clear({ force: true }).get('[name="price"]').clear({ force: true })
		cy.get('div.orderform')
			.within(() => {
				cy.get('#buyButton').click()
			})
			.get('.order-errors')
			.get('ul.order-errors__wrapper')
			.eq(0)
			.should('contain', 'Amount BTC must be a number')
		cy.get('div.orderform')
			.within(() => {
				cy.get('#sellButton').click()
			})
			.get('.order-errors')
			.get('ul.order-errors__wrapper')
			.eq(0)
			.should('contain', 'Amount BTC must be a number')
	}
	static verifyMarketMarginFields() {
		cy.waitUntil(() =>
			cy.get('div.ui-labeledcheckbox__container').within(() => {
				cy.get('[data-qa-id="reduceOnly-checkbox-label"]').should('be.visible')
			})
		)
	}
	static validateMinMarket() {
		cy.get('div.orderform')
		cy.fixture('orders')
			.then((min) => {
				cy.waitUntil(() =>
					cy
						.get('[name="amount"]')
						.clear({ force: true })
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
			.get('div.orderform')
			.within(() => {
				cy.get('#sellButton').click()
			})
		cy.waitUntil(() =>
			cy
				.get('.notification-text__text')
				.should('contain', `Invalid order: minimum size for BTC/USD`)
		)
	}
	static validateMaxMarket() {
		cy.get('div.orderform')
		cy.fixture('orders')
			.then((max) => {
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
					.get('div.ui-modaldialog__footer')
					.within(() => {
						cy.get('[data-qa-id="modal-dialog-action-button"]').contains('Okay').click()
					})
				cy.waitUntil(() =>
					cy
						.get('.notification-text__text')
						.should('contain', `Invalid order: maximum size for BTC/USD`)
				)
			})
			.get('div.orderform')
			.within(() => {
				cy.get('#sellButton').click()
			})
			.get('div.ui-modaldialog__footer')
			.within(() => {
				cy.get('[data-qa-id="modal-dialog-action-button"]').contains('Okay').click()
			})
		cy.waitUntil(() =>
			cy
				.get('.notification-text__text')
				.should('contain', `Invalid order: maximum size for BTC/USD`)
		)
	}
	static checkMaxMarketValue() {
		cy.get('.ui-buysellinputindicator')
			.last()
			.within(() => {
				cy.get('i').last().click()
			})

		cy.get('input.textinputsearch__searchinput').eq(1).clear().type('BTC')
		cy.get('[data-qa-id="balancesTable-row"]')
			.contains(new RegExp('^BTC$', 'g'))
			.parents('[data-qa-id="balancesTable-row-cell"]')
			.next()
			.find('.avail')
			.then(($val) => {
				const txt = $val.text()
				let pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
				cy.get('[name="amount"]').should('contain.value', pointNum)
				cy.get('div.ui-buysellinputindicator')
					.last()
					.within(() => {
						cy.get('i').last().click()
					})
			})

		cy.get('input.textinputsearch__searchinput').eq(1).clear().type('BTC')
		cy.get('[data-qa-id="balancesTable-row"]')
			.contains('BTC')
			.parents('[data-qa-id="balancesTable-row-cell"]')
			.next()
			.find('.avail')
			.then(($val) => {
				const txt = $val.text()
				var pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
				cy.get('[name="amount"]').should('contain.value', pointNum)
			})
	}
	static buyMarketOrder() {
		cy.fixture('orders').then((btc) => {
			cy.waitUntil(() =>
				cy
					.get('[name="amount"]')
					.clear()
					.type(`${btc[0].btc}`)
					.get('div.bid')
					.get('div.orderform')
					.within(() => {
						cy.get('#buyButton').click()
					})
			)
		})
	}
	static sellMarketOrder() {
		cy.fixture('orders').then((btc) => {
			cy.waitUntil(() =>
				cy
					.get('[name="amount"]')
					.clear()
					.type(`${btc[0].btc}`)
					.get('div.bid')
					.get('div.orderform')
					.within(() => {
						cy.get('#sellButton').click()
					})
			)
		})
	}
	static selectStopOrder() {
		cy.waitUntil(() =>
			cy
				.get('[data-qa-id="order-form__order-type-dropdown"]')
				.click()
				.get('input#orderFormDropdown')
				.get('#orderFormDropdownItem_stop')
				.get('[data-qa-id="order-form__order-type-dropdown-menu-item-stop"]')
				.click()
		)
	}
	static buyStopOrder() {
		cy.get('.book__row--reversed')
			.first()
			.within(() => {
				cy.get('span').eq(2).click()
			})
		cy.get('[data-qa-id="order-form"]').within(() => {
			cy.get('div#form-choose-exchange').contains('Exchange').click()
			cy.fixture('orders').then((btc) => {
				cy.get('[name="amount"]').clear().type(`${btc[0].btc}`)
				cy.get('#buyButton').click()
			})
		})
	}
	static sellStopOrder() {
		cy.get('.book__row')
			.first()
			.within(() => {
				cy.get('span').eq(2).click()
			})
		cy.get('[data-qa-id="order-form"]').within(() => {
			cy.get('div#form-choose-exchange').contains('Exchange').click()
			cy.fixture('orders').then((btc) => {
				cy.get('[name="amount"]').clear().type(`${btc[0].btc}`)
				cy.get('#sellButton').click()
			})
		})
	}
	static setPriceToHighestBid() {
		cy.get('.ui-buysellinputindicator')
			.first()
			.within(() => {
				cy.get('i').first().click()
			})
	}
	static setPriceToLowestAsk() {
		cy.get('.ui-buysellinputindicator')
			.first()
			.within(() => {
				cy.get('i').last().click()
			})
	}
	static checkHighestBid() {
		cy.get('span.ui-fieldlabel__innertag')
			.contains('Bid')
			.next('span')
			.then(($val) => {
				const txt = $val.text()
				let pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
				cy.get('[name="price"]').should('contain.value', `${pointNum}`)
			})
	}
	static checkLowestAsk() {
		cy.get('span.ui-fieldlabel__innertag')
			.contains('Ask')
			.next('span')
			.then(($val) => {
				const txt = $val.text()
				let pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
				cy.get('[name="price"]').should('contain.value', `${pointNum}`)
			})
	}
	static getOrderTypeSelector(orderType) {
		const orderTypes = {
			Limit: 'limit',
			Market: 'market',
			Stop: 'stop',
			'Stop limit': 'stoplimit',
			'Fill or kill': 'fillorkill',
			'Immediate or Cancel': 'immediateorcancel',
			Scaled: 'scaled',
		}
		return orderTypes[orderType]
	}
	static selectOrderType(order) {
		const orderTypeSelector = this.getOrderTypeSelector(order)
		cy.get('[data-qa-id="order-form__order-type-dropdown"]').click()
		cy.get(`[data-qa-id="order-form__order-type-dropdown-menu-item-${orderTypeSelector}"]`).click()
	}
	static priceInputIsDisabled() {
		cy.get('.orderform').within(() => {
			cy.get('[name="price"]').should('be.disabled').and('have.attr', 'disabled')
		})
	}
	static priceInputContains(text) {
		cy.get('.orderform').within(() => {
			cy.get('[name="price"]').should('have.attr', 'value', text)
		})
	}
	static getOrderFormOptionSelector(orderFormOption) {
		const orderFormOptions = {
			OCO: 'oco',
			HIDDEN: 'hiden',
			'POST-ONLY': 'postonly',
			TIF: 'tif',
			'REDUCE-ONLY': 'reduceOnly',
		}
		return orderFormOptions[orderFormOption]
	}
	static checkOrderFormOption(option) {
		const orderFormOption = this.getOrderFormOptionSelector(option)
		cy.get(`[data-qa-id="${orderFormOption}-checkbox-label"]`).click()
	}
	static clickOnExchangeBuyButton() {
		cy.get('#buyButton').click()
	}
	static clickOnSubmitButton() {
		cy.get('#submitButton').click()
	}
	static orderErrorDisplayed(errorMessage) {
		cy.get('.order-errors').within(() => {
			cy.get('ul>li').contains(errorMessage)
		})
	}
	static buyButtonContains(textButton) {
		cy.get('#buyButton').contains(textButton)
	}
	static sellButtonContains(textButton) {
		cy.get('#sellButton').contains(textButton)
	}
	static orderFormOptionIsVisible(option) {
		const orderFormOption = this.getOrderFormOptionSelector(option)
		cy.get(`[data-qa-id="${orderFormOption}-checkbox-label"]`).should('be.visible')
	}
	static orderFormOptionIsNotVisible(option) {
		const orderFormOption = this.getOrderFormOptionSelector(option)
		cy.get(`[data-qa-id="${orderFormOption}-checkbox-label"]`).should('not.exist')
	}
	static exchangeTabIsVisible() {
		cy.get('[data-qa-id="order-form"]').within(() => {
			cy.get('div#form-choose-exchange').contains('Exchange').should('be.visible')
		})
	}
	static marginTabIsVisible() {
		cy.get('[data-qa-id="order-form"]').within(() => {
			cy.get('div#form-choose-margin').contains('Margin').should('be.visible')
		})
	}
	static marginTabIsNotVisible() {
		cy.get('[data-qa-id="order-form"]').within(() => {
			cy.get('div#form-choose-margin').should('not.exist')
		})
	}
}
export default orderform
