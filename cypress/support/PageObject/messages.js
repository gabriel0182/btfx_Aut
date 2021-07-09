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
}
export default messages
