class login {
	static landing() {
		cy.clearCookies()
		cy.window().then((win) => {
			win.sessionStorage.clear()
		})
		cy.clearLocalStorage()
		cy.setCookie('bfx_locale', 'en')
	}
	static longIn() {
		cy.visitBitfinexAndLogin()
	}
	static verifyLoggedOn() {
		cy.waitUntil(() =>
			cy
				.get('#footer')
				.get('.page-footer__content > :nth-child(1) > :nth-child(1)')
				.scrollIntoView()
				.get(':nth-child(1) > :nth-child(1) > .page-footer__title')
				.should('be.visible')
		)
	}
}

export default login
