class provided {
	static selectTicker() {
		cy.intercept(
			'GET',
			'https://api.staging.bitfinex.com/v2/candles/trade:30m:fUSD:a30:p2:p30/last'
		).as('funding')
		cy.wait('@funding').its('response.statusCode').should('eq', 200)
		cy.fixture('funding').then((ticker) => {
			context(`Generating a test for ${ticker[0].ticker}`, () => {
				cy.get('div#ticker-sidebar-nav').should('be.visible').should('exist')
				cy.get('[data-qa-id="ticker-list-search-input"]').type(`${ticker[0].ticker}{enter}`)
				cy.get('.tickerlist__container').within(() => {
					cy.get('[href="/f/USD"]').filter('.tickerlist__symbolcell').click()
				})

				cy.get('span.trigger.ui-tooltip.ui-tooltip--cursor-help').should(
					'contain.text',
					`${ticker[0].ticker}`
				)
			})
		})
	}
	static createOffer() {
		cy.fixture('funding').then((offer) => {
			context(`Generating a test for ${offer[0].rate}`, () => {
				cy.get('.ui-collapsible__body').within(() => {
					cy.get('#rateInput').clear().type(`${offer[0].rate}`)
					cy.get('#amountInput').clear().type(`${offer[0].amount}`)
					cy.get('span.trigger.ui-tooltip.ui-tooltip--underline.ui-tooltip--cursor-help')
						.contains('MAX')
						.click()
				})
			})
		})
	}
	static processOffer() {
		cy.get('div.offerform__section-row.bfx-ui-of-sr').within(() => {
			cy.get('button#offerFormAskButton.ui-button.ui-button--red').click()
		})
		cy.get('[data-qa-id="modal-dialog"]').within(() => {
			cy.get('[data-qa-id="modal-dialog-action-button"]').contains('Okay').click()
		})
		cy.fixture('funding').then((offer) => {
			context(`Generating a test for ${offer[0].amount}`, () => {
				const confirmationMsg = `Your funding Offer of ${offer[0].amount} ${offer[0].ticker} EXECUTED at`
				cy.waitUntil(() => cy.get('.notification-text__text').should('be.visible'))
				cy.waitUntil(() => cy.get('.notification-text__text').should('contain', confirmationMsg))
			})
		})
	}

	static validateProvided() {
		cy.get(
			'div.themed-border.virtable__headerrow.ReactVirtualized__Table__headerRow.themed-border'
		).within(() => {
			cy
				.get(
					'div.ReactVirtualized__Table__headerColumn.virtTable-headerRow.ReactVirtualized__Table__sortableHeaderColumn'
				)
				.get('[aria-label="Amount"]').click
		})
		cy.fixture('funding').then((offer) => {
			context(`Generating a test for ${offer[0].amount}`, () => {
				cy.waitUntil(() =>
					cy
						.get(
							'[aria-rowindex="1"] > [aria-colindex="3"] > .virtable__cellwrapper > :nth-child(1) > :nth-child(1)'
						)
						.first()
						.should('contain', `${offer[0].amount}`)
				)
			})
		})
	}
}
export default provided
