class summary {
	static validateTradableBalance(leverage) {
		cy.get('[data-qa-id="balancesTable-row-cell"]')
			.eq(2)
			.find('.avail')
			.then(($val) => {
				const availableMarginBalance = Number($val.text().replace(/[^0-9\.-]+/g, ''))
				const tradableBalance =
					parseFloat(availableMarginBalance).toFixed(2) * parseFloat(leverage).toFixed(5)
				return cy.wrap(tradableBalance)
			})
			.as('tradableBalance')

		cy.get('@tradableBalance').then((tradableBalance) => {
			cy.get('.col-num')
				.first()
				.then(($val) => {
					const realtradableBalance = Number($val.text().replace(/[^0-9\.-]+/g, ''))
					expect(parseFloat(tradableBalance).toFixed(0)).to.be.equal(
						parseFloat(realtradableBalance).toFixed(0)
					)
				})
		})
	}
}

export default summary
