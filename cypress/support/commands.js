import 'cypress-wait-until'
const urlApiPub = 'https://api-pub.staging.bitfinex.com/v2'

Cypress.Commands.add('loginToBitfinexManually', () => {
	cy.intercept('POST', 'https://www.staging.bitfinex.com/sessions').as('sessions')
	cy.intercept('POST', 'https://www.staging.bitfinex.com/sessions/otp_submit').as('otpSubmit')
	cy.intercept('GET', `${urlApiPub}/tickers?symbols=ALL`).as('allSymbols')
	cy.intercept('GET', `${urlApiPub}/conf/pub:list:features`).as('listFeature')

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
		expect(err.message).to.include('')
		return false
	})
	cy.wait('@listFeature').its('response.statusCode').should('eq', 200)
	cy.wait('@allSymbols').its('response.statusCode').should('eq', 200)

	let session = cy.getCookie('_bfx_session')
	cy.request('GET', 'https://www.staging.bitfinex.com/_ws_token', {
		cookie: `${session.name}=${session.value}`,
	}).then((response) => {
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
			cy.fixture('sensitive/credentials.json').then((credentials) => {
				cy.setCookie('bfx_locale', 'en')
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
					//cy.skipCaptcha()
					.task('generateOTP', `${credentials.otp_secret}`)
					.then((token) => {
						cy.wait('@sessions').its('response.statusCode').should('eq', 200)
						cy.get('#twofa-modal').should('be.visible')
						cy.get('#otp-form').within(() => {
							cy.get('[data-otp=autosubmit]').type(token).log(token)
							cy.wait('@otpSubmit').its('response.statusCode').should('eq', 200)
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

Cypress.Commands.add('logIn', () => {
	cy.clearCookie('_bfx_session')
	cy.visitWithCloudFlareBypass('/')
})

Cypress.Commands.add('visitBitfinexAndLogin', () => {
	cy.loginFromBackend()
})
Cypress.Commands.add('resolveUsResident', () => {
	cy.getCookie('ask_if_us_resident').then((residentChallege) => {
		if (residentChallege?.value) {
			cy.getCookie('_bfx_session').then((session) => {
				cy.request('GET', 'https://www.staging.bitfinex.com/_ws_token', {
					cookie: `${session.name}=${session.value}`,
				}).then((response) => {
					cy.request({
						method: 'POST',
						url: 'https://api.staging.bitfinex.com/v1/account_us_resident',
						body: { res: 'false' },
						headers: {
							'bfx-token': response.body.token,
							'content-type': 'application/json;charset=UTF-8',
						},
					}).then(() => {
						cy.setCookie('ask_if_us_resident', 'false')
					})
				})
			})
		}
	})
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
	cy.get('#interface').should('be.visible')
})

Cypress.Commands.add('visitWithCloudFlareBypass', (route) => {
	cy.fixture('sensitive/credentials.json').then((credentials) => {
		const headers = {
			'CF-Access-Client-Id': credentials.cloudflare_id,
			'CF-Access-Client-Secret': credentials.cloudflare_secret,
		}
		cy.visit(route, { headers: headers })
	})
})

Cypress.Commands.add('byPassCloudFlare', (route) => {
	cy.fixture('sensitive/credentials.json').then((credentials) => {
		cy.request({
			log: false,
			method: 'GET',
			url: route,
			headers: {
				'CF-Access-Client-Id': credentials.cloudflare_id,
				'CF-Access-Client-Secret': credentials.cloudflare_secret,
			},
			failOnstatusCode: false,
			'Retry-After': 120,
		})
	})
})

Cypress.Commands.add('loginSessionByCSRF', (login, password, authenticity_token) => {
	cy.request({
		log: false,
		method: 'POST',
		url: 'https://www.staging.bitfinex.com/sessions',
		failOnstatusCode: false,
		'Retry-After': 120,
		form: true,
		body: {
			authenticity_token,
			login,
			password,
		},
	})
		.its('body')
		.then((body) => {
			const $html = Cypress.$(body)
			const csrfOTP = $html.find('#otp-form > input[name=authenticity_token]').val()
			return cy.wrap(csrfOTP)
		})
})

Cypress.Commands.add('getAuthenticitySessionToken', () => {
	cy.request({
		log: false,
		'Retry-After': 120,
		method: 'GET',
		url: 'https://www.staging.bitfinex.com/login',
		failOnstatusCode: false,
	})
		.its('body')
		.then((body) => {
			const $html = Cypress.$(body)
			const csrfSession = $html.find('#login-form-page > input[name=authenticity_token]').val()
			return cy.wrap(csrfSession)
		})
})

Cypress.Commands.add('loginOTP', (authenticity_token, otp) => {
	cy.request({
		log: false,
		'Retry-After': 120,
		method: 'POST',
		url: 'https://www.staging.bitfinex.com/sessions/otp_submit',
		failOnstatusCode: false,
		form: true,
		body: {
			authenticity_token,
			otp,
		},
	}).then((response) => {
		expect(response.status, 'Successful Login').to.equal(200)
		// Preserve the fresh auth token
		Cypress.Cookies.preserveOnce('__bfx_token')
		cy.setCookie('ask_if_us_resident', 'false')
		// If login was successful we should have a __bfx_token cookie
		// Save the token to file to we can re-use it again
		cy.getCookie('__bfx_token').then((token) => {
			if (token?.value) {
				cy.log('Storing token in cache.. ' + token.value)
				cy.task('writeTokenToFile', token.value)
			}
		})
	})
})

Cypress.Commands.add('loginFromBackend', () => {
	cy.fixture('sensitive/credentials.json').then((credentials) => {
		cy.window().then((win) => {
			win.sessionStorage.clear()
		})
		cy.clearLocalStorage()
		cy.setCookie('bfx_locale', 'en')
		cy.clearCookie('_bfx_session')

		Cypress.log({
			name: 'login',
			displayName: 'Bitfinex Login: ',
			message: [`Authenticating | with ${credentials.login} user`],
			autoEnd: true,
		})

		// Token management:
		// 1) Check the cookies for a __bfx_token, if present, use it, else..
		// 2) Check the cache (token.txt @ root) for a token, if present (and not expired), use it, else..
		// 3) Perform a login via API to generate a fresh token, and store a copy in the cache
		// - Rationale: login should only be nessasary at the start of the run - sequential runs
		// can re-use the same token (providing it hasn't expired), this prevents issues with over-using OTP submission
		cy.getCookie('__bfx_token').then((t) => {
			if (!t) {
				cy.task('readTokenFromFileAndCheckValidity').then((token) => {
					if (token) {
						cy.log('Token fetched from cache.. ' + token)
						cy.setCookie('__bfx_token', token)
					} else {
						cy.task('generateOTP', credentials.otp_secret).then((otp) => {
							cy.getAuthenticitySessionToken().then((authenticity_token_session) => {
								cy.loginSessionByCSRF(
									credentials.login,
									credentials.password,
									authenticity_token_session
								).then((authenticity_token_otp) => {
									cy.loginOTP(authenticity_token_otp, otp)
								})
							})
						})
					}
				})
			} else {
				cy.log('Re-using exisitng token.. ' + t.value)
				expect(t.value).to.match(/^pub/)
				Cypress.Cookies.preserveOnce('__bfx_token')
			}
		})

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
		cy.url().should('include', '/t?type=exchange')
	})
})
