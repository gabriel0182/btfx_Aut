class messages {
	static buyLimitConfirm() {
		cy.fixture('orders').then((order) => {
			cy.waitUntil(() =>
				cy
					.get('.notification-text__text')
					.should('be.visible')
					.should('contain', `Created exchange limit buy order of ${order[0].btc} BTC`)
			)
		})
	}
	static sellLimitConfirm() {
		cy.fixture('orders').then((order) => {
			cy.waitUntil(() =>
				cy
					.get('.notification-text__text')
					.should('be.visible')
					.should('contain', `Created exchange limit sell order of ${order[0].btc} BTC`)
			)
		})
	}
	static cancelLimitOrder() {
		cy.fixture('orders').then((order) => {
			cy.waitUntil(() =>
				cy
					.get('.notification-text__text')
					.should('be.visible')
					.should('contain', `Exchange limit buy order of ${order[0].btc} BTC has been canceled`)
			)
		})
	}
	static cancelSellLimitOrder() {
		cy.fixture('orders').then((order) => {
			cy.waitUntil(() =>
				cy
					.get('.notification-text__text')
					.should('be.visible')
					.should('contain', `Exchange limit sell order of ${order[0].btc} BTC has been canceled`)
			)
		})
	}
	static buyMarketConfirm() {
		cy.fixture('orders').then((order) => {
			cy.waitUntil(() =>
				cy
					.get('.notification-text__text')
					.should('be.visible')
					.should(
						'contain',
						`Margin market buy order of ${order[0].btc} BTC has been fully executed`
					)
			)
		})
	}
	static cancelBuyMarketOrder() {
		cy.fixture('orders').then((order) => {
			cy.waitUntil(() =>
				cy
					.get('.notification-text__text')
					.should('be.visible')
					.should(
						'contain',
						`Margin market sell order of ${order[0].btc} BTC has been fully executed`
					)
			)
		})
	}
}
export default messages
