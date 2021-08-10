class login {
	static landing() {
		cy.clearCookies()
		cy.window().then((win) => {
			win.sessionStorage.clear()
		})
		cy.clearLocalStorage()
		cy.setCookie('bfx_locale', 'en')
	}
	static logIn() {
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
	static logout(){
		cy.get('[data-qa-id="header-button-account"]')
		.click()
		cy.get('[data-qa-id="header-dropdown-account"]')
		.within(()=>{
			cy.get('.header__dropdown-list-item')
			.contains('Logout')
			.click()
		})
	}
}

export default login
