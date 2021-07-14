const apiStagingUrl = 'https://api.staging.bitfinex.com'
class positions {
	static cancelPosition() {
		cy.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('button.ui-button.ui-button--grey.ui-button--size-XS').get('i.fa-times').click()
			})
			.get('div.ui-modaldialog__footer')
			.within(() => {
				cy.get('[data-qa-id="modal-dialog-action-button"]').contains('Okay').click()
			})
	}
	static addPosition() {
		cy.get('[data-qa-id="header-link-trading"]').filter('.header__nav-button').click()
		cy.get('[data-qa-id="positions"]').within(() => {
			cy.get('[type="button"]').first().click()
		})
	}
	static createLong() {
		cy.intercept(`${apiStagingUrl}/v1/lendbook/USD?filter=LIMIT_ONLY`).as('limitOnly')
		cy.intercept('POST', `${apiStagingUrl}/v2/auth/w/position/increase`).as('increase')

		cy.fixture('positions').then((position) => {
			cy.get('[data-qa-id="modal-dialog-content"]').within(() => {
				cy.contains('Select').type(`${position[0].type}{enter}{enter}`)
				cy.get('.ui-radioinput').within(() => {
					cy.contains('Long').click()
					cy.wait('@limitOnly').its('response.statusCode').should('eq', 200)
				})
				cy.contains('Amount').next().type(position[0].amount)
				cy.contains('Proceed').click()
				cy.wait('@increase').its('response.statusCode').should('eq', 200)
			})
		})
	}
	static createShort() {
		cy.intercept('POST', `${apiStagingUrl}/v2/auth/w/position/increase`).as('increase')
		cy.fixture('positions').then((position) => {
			cy.get('[data-qa-id="modal-dialog-content"]').within(() => {
				cy.contains('Select').type(`${position[0].type}{enter}{enter}`)
				cy.get('.ui-radioinput').within(() => {
					cy.contains('Short').click()
				})
				cy.contains('Amount').next().type(position[0].amount)
				cy.contains('Proceed').click()
				cy.wait('@increase').its('response.statusCode').should('eq', 200)
			})
		})
	}
	static minMaxPositionAmount() {
		cy.fixture('positions').then((position) => {
			cy.intercept('POST', `${apiStagingUrl}/v2/auth/w/position/increase`).as('increase')
			cy.get('[data-qa-id="modal-dialog-content"]').within(() => {
				cy.contains('Select').type(`${position[0].type}{enter}{enter}`)
			})
		})
		cy.get('.ui-radioinput').within(() => {
			cy.get('div.circle').last().click({ force: true })
		})
		cy.get('[data-qa-id="modal-dialog-content"]').within(() => {
			cy.contains('Amount').next().click().type('0.000000001')
		})
		cy.get('div.increase-positon__input__error').should('contain', 'Minimum BTC amount')
		cy.get('.ui-radioinput').within(() => {
			cy.contains('Long').click()
		})
		cy.get('[data-qa-id="modal-dialog-content"]').within(() => {
			cy.contains('Amount').next().clear().type('99999999999999')
		})
		cy.get('div.increase-positon__input__error').eq(0).should('contain', 'Maximum BTC amount 10')
		cy.get('div.increase-positon__input__error')
			.eq(1)
			.should('contain', 'You have insufficient tradable balance to increase your position')
		cy.get('div.increase-positon__input__error')
			.eq(2)
			.should('contain', 'Not enough funding available')
		cy.get('[data-qa-id="modal-dialog"]').within(() => {
			cy.get('i.close-icon').click()
		})
	}

	static sortingPositionTable() {
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Pair')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(3)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
					.should('contain', 'BTC/USD')
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Pair')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(3)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
					.should('contain', 'BTC/USD')
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Amount')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(8)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Amount')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(8)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Base price')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(15)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Base price')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(15)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Liq Price')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(19)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('P/L')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(21)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('P/L')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(21)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('P/L%')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(26)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('P/L%')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(26)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Funding Cost')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(31)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Funding Cost')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(31)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Funding Type')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(35)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
					.should('contain', 'Daily')
			})
		cy.get('[data-qa-id="positions-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Funding Type')
					.click()
			})
			.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(35)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
					.should('contain', 'Daily')
			})
	}
}
export default positions
