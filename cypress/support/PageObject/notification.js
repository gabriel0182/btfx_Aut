class notification {
	static isVisible() {
		cy.waitUntil(() =>
			cy.get('.notification__wrapper').within(() => {
				cy.get('.notification__skip').should('be.visible')
				cy.get('.notification__icon-wrapper').should('be.visible')
				cy.get('.notification__content').should('be.visible')
			})
		)
	}

	static containsMessage(notificationMessage) {
		cy.waitUntil(() =>
			cy.get('.notification__content').within(() => {
				cy.get('.notification-text__text').should('contain', notificationMessage)
			})
		)
	}

	static closeNotification() {
		cy.waitUntil(() =>
			cy.get('.notification__wrapper').within(() => {
				cy.get('.notification__skip').click()
			})
		)
	}
}
export default notification
