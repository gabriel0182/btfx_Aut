// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginToBitfinexManually', () => {
	// cy.intercept('POST', 'https://www.staging.bitfinex.com/sessions').as('sessions')
	// cy.intercept('POST', 'https://www.staging.bitfinex.com/sessions/otp_submit').as('otpSubmit')
	cy.setCookie('bfx_locale', 'en')
	/*cy.fixture("sensitive/credentials.json").then((credentials) => {
  cy.task("generateOTP", `${credentials.totp_secre}`)
          .then((token) => {
            console.log(token)
          }).pause()
        })*/
	cy.visitWithCloudFlareBypass('https://bfx-ui-trading.staging.bitfinex.com/t', {
		onBeforeLoad(win) {
			Object.defineProperty(win.navigator, 'language', { value: 'en-GB' })
			Object.defineProperty(win.navigator, 'languages', ['en-GB'])
			Object.defineProperty(win.navigator, 'accept_languages', {
				value: ['en'],
			})
		},
		headers: {
			'Accept-Language': 'en',
		},
	})
	cy.on('uncaught:exception', (err, runnable) => {
		//expect(err.message).to.include('d is not a function');
		//expect(err.message).to.include("t._innerWindow(...).widgetReady");
		expect(err.message).to.include('')
		return false
	})
		.get('#book-bids > .book__rows')
		.should('be.visible')
	let session = cy.getCookie('_bfx_session')
	cy.request('GET', 'https://www.staging.bitfinex.com/_ws_token', {
		cookie: `${session.name}=${session.value}`,
	}).then(response => {
		let token = response.body.token
		if (token.length > 0) {
			return this
		} else {
			cy.setCookie('bfx_locale', 'en')
			cy.visitWithCloudFlareBypass('https://bfx-ui-trading.staging.bitfinex.com/t', {
				onBeforeLoad(win) {
					Object.defineProperty(win.navigator, 'language', { value: 'en-GB' })
					Object.defineProperty(win.navigator, 'languages', ['en-GB'])
					Object.defineProperty(win.navigator, 'accept_languages', {
						value: ['en'],
					})
				},
				headers: {
					'Accept-Language': 'en',
				},
			})
			cy.on('uncaught:exception', (err, runnable) => {
				//expect(err.message).to.include('Uncaught (in promise) TypeError: d is not a function');
				return false
			})
			cy.fixture('sensitive/credentials.json').then(credentials => {
				cy.get('.header__login-button')
					.should('be.visible')
					.click({ force: true })
					.get('#login')
					.type(credentials.login, { force: true })
					.get('#auth-password')
					.type(credentials.password, { log: false })
					.get('button')
					.click({ force: true })
					.get('#submit-login')
					.click({ force: true })
					// .get('#u2f-modal-wrap')
					// .get(':nth-child(6) > p > a')
					// .click()
					// const twoAF = cy.waitUntil(()=>
					//   cy.get("input#otp")
					//   .should('be.visible')
					// )
					.task('generateOTP', `${credentials.otp_secret}`)
					.then(token => {
						//cy.wait('@sessions').its('response.statusCode').should('eq', 200)
						cy.get('#twofa-modal').should('be.visible')
						cy.get('#otp-form').within(() => {
							cy.get('[data-otp=autosubmit]').type(token).log(token)
							// cy.wait('@otpSubmit').its('response.statusCode').should('eq', 200)
						})
						// cy.get('#twofa-modal > .modal-content > :nth-child(1) > .pad-for-content > :nth-child(1) > .row > [style="max-width:385px;"] > #otp-form > .input-field > #otp')
						// .type(token)
						// .log(token)
					})
				/*.task("generateOTP", `${credentials.totp_secre}`)
          .then((token) => {
            console.log(token)
          }).pause()*/
			})
		}
	})
})

Cypress.Commands.add('visitBitfinexHomepage', () => {
	cy.clearCookie('_bfx_session')
	cy.visitWithCloudFlareBypass('/')
})

Cypress.Commands.add('visitBitfinexAndLogin', () => {
	cy.loginToBitfinexManually()
	cy.waitForPageToLoad()
})
Cypress.Commands.add('resolveUsResident', () => {
	let residentChallege = cy.getCookie('ask_if_us_resident')
	if (residentChallege.value) {
		let session = cy.getCookie('_bfx_session')
		cy.request('GET', 'https://www.staging.bitfinex.com/_ws_token', {
			cookie: `${session.name}=${session.value}`,
		}).then(response => {
			cy.request({
				method: 'POST',
				url: 'https://api.staging.bitfinex.com/v1/account_us_resident',
				body: { res: 'false' },
				headers: {
					'bfx-token': response.body.token,
					'content-type': 'application/json;charset=UTF-8',
				},
			}).then(r => {
				cy.log(JSON.stringify(r))
				cy.setCookie('ask_if_us_resident', 'false')
				cy.reload()
			})
		})
	}
})

function lookForSpinners() {
	return new Cypress.Promise((resolve, reject) => {
		// Poll for the presence of spinners
		setInterval(() => {
			let spinners = Cypress.$('i.fa-spin')
			if (spinners.length == 0) {
				resolve(0)
			}
		}, 1000)

		setTimeout(() => {
			resolve(-1)
		}, 10000)
	})
}

Cypress.Commands.add('waitForPageToLoad', () => {
	// Give the page upto 60 seconds to resolve loading before continuing (wait for all loading spinners to disappear)
	// cy.get("i.fa-spin", { timeout: 60000 }).should("be.at.least", 1)
	cy.get('#interface').should('be.visible')

	/*cy.wrap(null).then(() => {
    return lookForSpinners().then(s => {
      if (s == -1) {
        cy.visitBitfinexAndLogin()
      }
    })
  })*/
})

Cypress.Commands.add('visitWithCloudFlareBypass', route => {
	cy.fixture('sensitive/credentials.json').then(credentials => {
		const headers = {
			'CF-Access-Client-Id': credentials.cloudflare_id,
			'CF-Access-Client-Secret': credentials.cloudflare_secret,
		}
		cy.visit(route, { headers: headers })
	})
})
import 'cypress-wait-until'
