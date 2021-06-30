const apiStagingUrl = 'https://api.staging.bitfinex.com'
class longPosition {
	static addPosition() {
		cy.get('[data-qa-id="header-link-trading"]').filter('.header__nav-button').click()
		cy.get('[data-qa-id="positions"]').within(() => {
			cy.get('[type="button"]').first().click()
		})
	}

	static requiredInfo() {
		cy.intercept(`${apiStagingUrl}/v1/lendbook/USD?filter=LIMIT_ONLY`).as('limitOnly')
		cy.intercept('POST', `${apiStagingUrl}/v2/auth/w/position/increase`).as('increase')
		cy.fixture('positions').then((position) => {
			context(`Generating a test for ${position[0].type}`, () => {
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
		})
	}

	static successMsg() {
		cy.intercept('POST', `${apiStagingUrl}/v2/auth/r/stats/rank:vol:3h:tBTCUSD/hist?limit=1`).as(
			'stats'
		)
		cy.wait('@stats').its('response.statusCode').should('eq', 200)
		cy.get('.notification-text__text').should('contain', 'Submitting position increase')
	}

	static cancelPosition() {
		cy.fixture('positions').then((position) => {
			context(`Generating a test for ${position[0].amount}`, () => {
				cy.get('[data-qa-id="positions-table-row"]').within(() => {
					cy.get('[type="button"]').first().click()
				})
				cy.get('[data-qa-id="modal-dialog"]').within(() => {
					cy.get('[data-qa-id="modal-dialog-action-button"]').contains('Okay').click()
				})
				cy.wait('@stats').its('response.statusCode').should('eq', 200)
				const confirmationMsg = `Margin market sell order of ${position[0].amount} BTC has been fully executed`
				cy.get('.notification-text__text').should('contain', confirmationMsg)
			})
		})
	}
}
export default longPosition
