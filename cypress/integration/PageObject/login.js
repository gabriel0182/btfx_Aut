class login {
	landing() {
		cy.clearCookies()
		cy.window().then(win => {
			win.sessionStorage.clear()
		})
		cy.clearLocalStorage()
		cy.setCookie('bfx_locale', 'en')
		return this
	}
	longIn() {
		cy.visitBitfinexAndLogin()
		cy.resolveUsResident()
		return this
	}
	verifyLoggedOn() {
		const accountName = cy.waitUntil(() =>
			cy
				.get('#footer')
				.get('.page-footer__content > :nth-child(1) > :nth-child(1)')
				.scrollIntoView()
				.get(':nth-child(1) > :nth-child(1) > .page-footer__title')
				.should('contain', 'gabriel.aguar')
		)
		return this
	}
}

export default login
