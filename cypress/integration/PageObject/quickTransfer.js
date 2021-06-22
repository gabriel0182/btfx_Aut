class quickTransfer {
	static selectCurrency() {
		cy.fixture('orders').then((order) => {
			cy.get('#balances-search-input').type(`${order[0].tranfer}`)
			cy.get('[data-qa-id="balancesTable"]').within(() => {
				cy.get('[data-qa-id="balancesTable-row"]')
					.first()
					.within(() => {
						cy.get('[data-qa-id="balancesTable-row-cell"]')
							.first()
							.contains(`${order[0].tranfer}`)
							.click()
					})
			})
		})
	}

	static selectSource() {
		cy.get('#bal-overlay').within(() => {
			cy.log('Click on the Transfer button from exchange wallet')
			cy.get('a').contains('Transfer').click()
		})
		cy.get('.balances-transfer').within(() => {
			cy.log('Selecting source of transfer')
			cy.get('tbody>tr').eq(0).first('td').click()
		})
	}

	static selectDestination() {
		cy.get('.balances-transfer').within(() => {
			cy.log('Select destination of transfer')
			cy.get('tbody>tr').eq(1).children('.balances-transfer__destination').click()
		})
	}

	static tranferAmount() {
		const apiUrlStaging = 'https://api.staging.bitfinex.com/v2'
		cy.intercept('POST', `${apiUrlStaging}/auth/w/transfer`).as('transfer')
		cy.fixture('orders').then((order) => {
			cy.get('[data-qa-id="modal-dialog"]').within(() => {
				cy.log('Type the amount to transfer')
				cy.get('input[type=text]').clear().type(order[0].tranferAmt)
			})
			const confirmationMsg = `${order[0].tranferAmt} US Dollar transfered from Exchange to Margin`
			cy.log('Click on the Transfer button')
			cy.get('button[type=button]').contains('Transfer').click()
			cy.wait('@transfer').then((xhr) => {
				expect(xhr.response.statusCode, 'statusCode: ').to.be.equal(200)
				expect(xhr.response.body[7], 'Confirmation Message: ').to.be.equal(confirmationMsg)
				expect(xhr.response.body[6], 'Success: ').to.be.equal('SUCCESS')
			})
			cy.log('Confirmating the success transfer message')
			cy.get('.notification-text__text').should('contain', confirmationMsg)
		})
	}
}
export default quickTransfer
