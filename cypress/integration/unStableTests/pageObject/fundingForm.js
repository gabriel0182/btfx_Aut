class fundingForm {
	static goFundingPage() {
		const fundingTab = cy.waitUntil(() =>
			cy
				.get(':nth-child(3) > .header__nav-button')
				.click()
				.get('div.header__dropdown-menu')
				.within(() => {
					cy.get('[href="/funding"]').contains('Funding').click()
				})
		)
		const verifyPageLoads = cy.waitUntil(() =>
			cy
				.get('div#book-bids')
				.should('be.visible', true)
				.get('div#book-asks')
				.should('be.visible', true)
		)
		return this
	}
	static selectTicker() {
		const testData = require('../../fixtures/funding.json')
		testData.forEach((testDataRow) => {
			const data = {
				ticker: testDataRow.ticker,
			}
			context(`Generating a test for ${data.ticker}`, () => {
				const searchTicker = cy
					.get('div.tickerlist__search')
					.get('input#ticker-textinput-id')
					.click()
				searchTicker.type(`${data.ticker}{enter}`)
				const selectTicker = cy
				cy.get('div.pair-table-body').within(() => {
					cy.get('span.table-vir__cell').get('[href="/f/USD"]').contains(`${data.ticker}`).click()
				})
				const verifyTicker = cy
					.get('.main-ticker__items > :nth-child(1)')
					.get(':nth-child(1) > .trigger > h5 > span')
					.should('contain', `${data.ticker}`)
			})
			return this
		})
	}
	static requiredFields() {
		const usdBid = cy.get('div.bfx-ui-of-sr').within(() => {
			cy.get('button.ui-button--green').click()
		})
		const msg = cy.waitUntil(() => cy.get('.notification-text__text').should('be.visible'))
		const verifyMsg = cy.waitUntil(() =>
			cy
				.get('.notification-text__text')
				.should('contain', 'Rate required, Amount required, Period required')
				.get('.notification__wrapper')
				.get('.notification__skip')
				.click({ multiple: true }, { force: true })
		)
		const validateRate = cy
			.get('input#rateInput')
			.clear()
			.type('-1')
			.get('input#amountInput')
			.clear()
			.type('1')
			.get('input#periodInput')
			.clear()
			.type('2')
			.get('div.bfx-ui-of-sr')
			.within(() => {
				cy.get('button.ui-button--green').click()
			})
			.get('.notification-text__text')
			.should('contain', 'Rate: invalid')
			.get('.notification__skip')
			.click({ multiple: true }, { force: true })
		const validateAmount = cy
			.get('input#rateInput')
			.clear()
			.type('1')
			.get('input#amountInput')
			.clear()
			.type('-1')
			.get('input#periodInput')
			.clear()
			.type('2')
			.get('div.bfx-ui-of-sr')
			.within(() => {
				cy.get('button.ui-button--green').click()
			})
			.get('.notification-text__text')
			.should('contain', 'Amount is negative')
			.get('.notification__skip')
			.click({ multiple: true }, { force: true })
		const validateMinAmount = cy
			.get('input#rateInput')
			.clear()
			.type('1')
			.get('input#amountInput')
			.clear()
			.type('10')
			.get('input#periodInput')
			.clear()
			.type('2')
			.get('div.bfx-ui-of-sr')
			.within(() => {
				cy.get('button.ui-button--green').click()
			})
			.get('.ui-modaldialog__footer')
			.get('.ui-modaldialog__footer > .ui-button--green')
			.click()
			.get('div.bfx-ui-of-sr')
			.within(() => {
				cy.get('button.ui-button--green').click()
			})
		const notification = cy.waitUntil(() =>
			cy
				.get('.notification-text__text')
				.should(
					'contain',
					'Invalid offer: incorrect amount, minimum is 50 dollar or equivalent in USD.'
				)
				.get('.notification__skip')
				.click({ multiple: true }, { force: true })
		)
		const validateMinPeriod = cy
			.get('input#rateInput')
			.clear()
			.type('1')
			.get('input#amountInput')
			.clear()
			.type('50')
			.get('input#periodInput')
			.clear()
			.type('1')
			.get('div.bfx-ui-of-sr')
			.within(() => {
				cy.get('button.ui-button--green').click()
			})
			.get('.ui-modaldialog__footer')
			.get('.ui-modaldialog__footer > .ui-button--green')
			.click()
			.get('div.bfx-ui-of-sr')
			.within(() => {
				cy.get('button.ui-button--green').click()
			})
			.get('.notification-text__text')
			.should('contain', 'Invalid offer: minimum lending period is 2 days.')
			.get('.notification__skip')
			.click({ multiple: true }, { force: true })
		const validateMaxPeriod = cy
			.get('input#rateInput')
			.clear()
			.type('1')
			.get('input#amountInput')
			.clear()
			.type('50')
			.get('input#periodInput')
			.clear()
			.type('121')
			.get('div.bfx-ui-of-sr')
			.within(() => {
				cy.get('button.ui-button--green').click()
			})
			.get('.ui-modaldialog__footer')
			.get('.ui-modaldialog__footer > .ui-button--green')
			.click()
			.get('div.bfx-ui-of-sr')
			.within(() => {
				cy.get('button.ui-button--green').click()
			})
			.get('.notification-text__text')
			.should('contain', 'Invalid offer: maximum lending period is 120 days.')
			.get('.notification__skip')
			.click({ multiple: true }, { force: true })
		return this
	}
	static validateFundingForm() {
		const hidden = cy.get('div.offerform__checkboxwrapper').within(() => {
			cy.get(':nth-child(1) > label').should('be.visible', true).and('contain.text', 'Hidden')
		})
		const ffr = cy
			.get('div.offerform__checkboxwrapper')
			.within(() => {
				cy.get(':nth-child(2) > label')
					.should('be.visible', true)
					.and('contain.text', 'FRR')
					.click()
					.blur({ force: true })
			})
			.get('div.offerform__checkboxwrapper')
			.within(() => {
				cy.get(':nth-child(3) > label')
					.should('have.attr', 'aria-checked', 'false')
					.get('div.ui-labeledcheckbox__container.small.disabled')
					.first()
					.should('be.visible')
			})
			.get('div.offerform__checkboxwrapper')
			.within(() => {
				cy.get(':nth-child(4) > label')
					.should('have.attr', 'aria-checked', 'false')
					.get('div.ui-labeledcheckbox__container.small.disabled')
					.last()
					.should('be.visible')
			})
		const frrVariable = cy.get('div.offerform__checkboxwrapper').within(() => {
			cy.get(':nth-child(2) > label').click().blur({ force: true })
		})
		cy.get('div.offerform__checkboxwrapper')
			.within(() => {
				cy.get(':nth-child(3) > label')
					.should('be.visible', true)
					.and('contain.text', 'FRR Δ VARIABLE')
					.click()
					.blur({ force: true })
			})
			.get('div.offerform__checkboxwrapper')
			.within(() => {
				cy.get(':nth-child(2) > label')
					.should('have.attr', 'aria-checked', 'false')
					.get('div.ui-labeledcheckbox__container.small.disabled')
					.last()
					.should('be.visible')
			})
			.get('div.offerform__checkboxwrapper')
			.within(() => {
				cy.get(':nth-child(4) > label')
					.should('have.attr', 'aria-checked', 'false')
					.get('div.ui-labeledcheckbox__container.small.disabled')
					.last()
					.should('be.visible')
			})
		const frrFixed = cy.get('div.offerform__checkboxwrapper').within(() => {
			cy.get(':nth-child(3) > label').click().blur({ force: true })
		})
		cy.get('div.offerform__checkboxwrapper')
			.within(() => {
				cy.get(':nth-child(4) > label')
					.should('be.visible', true)
					.and('contain.text', 'FRR Δ FIXED')
					.click()
					.blur({ force: true })
			})
			.get('div.offerform__checkboxwrapper')
			.within(() => {
				cy.get(':nth-child(2) > label')
					.should('have.attr', 'aria-checked', 'false')
					.get('div.ui-labeledcheckbox__container.small.disabled')
					.last()
					.should('be.visible')
			})
			.get('div.offerform__checkboxwrapper')
			.within(() => {
				cy.get(':nth-child(3) > label')
					.should('have.attr', 'aria-checked', 'false')
					.get('div.ui-labeledcheckbox__container.small.disabled')
					.last()
					.should('be.visible')
			})
		return this
	}
	static validateHighestBid() {
		const highestBid = cy.get('.orderform-bidask__label > :nth-child(1)').click()
		const rate = cy
			.get(':nth-child(1) > .trigger > .orderform-bidask__label > :nth-child(1)')
			.then(($btn) => {
				let txt = $btn.text()
				const readBid = cy.get('#rateInput').should('contain.value', `${txt}`)
			})
		return this
	}
	static validateLowestOffer() {
		const highestBid = cy.get('div.bid-ask__container').within(() => {
			cy.get(':nth-child(2) > .trigger > .orderform-bidask__label > :nth-child(1)').click()
		})
		const rate = cy
			.get(':nth-child(2) > .trigger > .orderform-bidask__label > :nth-child(1)')
			.then(($btn) => {
				let txt = $btn.text()
				const readBid = cy.get('#rateInput').should('contain.value', `${txt}`)
			})
		return this
	}
	static validateOfferAll() {
		const offerAmount = cy.get('div.ui-labeledinput__container').within(() => {
			cy.get('.trigger > .fa').click()
		})
		const readFunds = cy
			.get('#balances-search-input')
			.clear()
			.type('USD', '{enter}')
			.get('div.custom-scrollbar.balances-table')
			.get(':nth-child(4) > .trigger-ledger-modal > :nth-child(1) > .trigger > .total')
			.then(($btn) => {
				let txt = $btn.text()
				var pointNum = Number(txt.replace(/[^0-9\.-]+/g, ''))
				cy.get('#amountInput')
					.should('contain.value', `${pointNum}`)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		return this
	}
}
export default fundingForm
