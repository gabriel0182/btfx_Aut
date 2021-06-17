class quickTransfer {
	selectCurrency() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach(testDataRow => {
			const data = {
				tranfer: testDataRow.tranfer,
			}
			context(`Generating a test for ${data.tranfer}`, () => {
				const search = cy.get('#balances-search-input')
				search.type(`${data.tranfer}{enter}`)
			})
			const selectUSD = cy
				.get('div.balances__symbolcell')
				.get('span.show-soft')
				.contains(`${data.tranfer}`)
			selectUSD.click()
		})
		return this
	}
	selectSource() {
		const source = cy.get('.overlay-transfer-link').get('.overlay-transfer-link > :nth-child(1)')
		source.click()
		return this
	}
	selectDestination() {
		const destination = cy
			.get('tbody > :nth-child(2) > :nth-child(2)')
			.get('tbody > :nth-child(2) > :nth-child(2) > .trigger > span')
		destination.click()
		const exchange = cy
			.get('.balances-transfer > table > tbody > :nth-child(1) > :nth-child(2)')
			.get('tbody > :nth-child(1) > :nth-child(2) > .trigger > span')
		exchange.click()
		return this
	}
	tranferAmount() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach(testDataRow => {
			const data = {
				tranferAmt: testDataRow.tranferAmt,
			}
			context(`Generating a test for ${data.tranferAmt}`, () => {
				const amount = cy
					.get('.ui-modaldialog__body')
					.get(
						'.balance-transfer__form-input > .ui-labeledinput__container > div > .ui-labeledinput__input'
					)
					.clear()
				amount.type(data.tranferAmt)
			})
		})
		const transferButton = cy.get('.balance-transfer__form-button')
		transferButton.click().wait(1000)
		return this
	}
	successMsg() {
		const testData = require('../../fixtures/orders.json')
		testData.forEach(testDataRow => {
			const data = {
				tranferAmt: testDataRow.tranferAmt,
			}
			context(`Generating a test for ${data.tranferAmt}`, () => {
				const verifyMsg = cy.waitUntil(() =>
					cy
						.get('.notification-text__text')
						.should('contain', `${data.tranferAmt} US Dollar transfered from Margin to Exchange`)
				)
			})
		})
		return this
	}
}
export default quickTransfer
