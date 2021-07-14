const apiStagingUrl = 'https://api.staging.bitfinex.com'

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
	static sellMarketConfirm() {
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
	static confirmLongPosition() {
		cy.intercept('POST', `${apiStagingUrl}/v2/auth/r/stats/rank:vol:3h:tBTCUSD/hist?limit=1`).as(
			'stats'
		)
		cy.wait('@stats').its('response.statusCode').should('eq', 200)
		cy.get('.notification-text__text').should('contain', 'Submitting position increase')
	}
	static confirmCancelLongPosition() {
		cy.fixture('positions').then((position) => {
			cy.intercept('POST', `${apiStagingUrl}/v2/auth/r/stats/rank:vol:3h:tBTCUSD/hist?limit=1`).as(
				'stats'
			)
			cy.wait('@stats').its('response.statusCode').should('eq', 200)
			const confirmationMsg = `Margin market sell order of ${position[0].amount} BTC has been fully executed`
			cy.get('.notification-text__text').should('contain', confirmationMsg)
		})
	}
	static confirmShortPosition() {
		cy.intercept('POST', `${apiStagingUrl}/v2/auth/r/stats/rank:vol:3h:tBTCUSD/hist?limit=1`).as(
			'stats'
		)
		cy.wait('@stats').its('response.statusCode').should('eq', 200)
		cy.get('.notification-text__text').should('contain', 'Submitting position increase')
	}
	static confirmCancelShortPosition() {
		cy.fixture('positions').then((position) => {
			cy.intercept('POST', `${apiStagingUrl}/v2/auth/r/stats/rank:vol:3h:tBTCUSD/hist?limit=1`).as(
				'stats'
			)
			cy.wait('@stats').its('response.statusCode').should('eq', 200)
			const confirmationMsg = `Margin market buy order of ${position[0].amount} BTC has been fully executed`
			cy.get('.notification-text__text').should('contain', confirmationMsg)
		})
	}
}
export default messages
