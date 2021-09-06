// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const cucumber = require('cypress-cucumber-preprocessor').default
const fs = require('fs')
const tokenFile = 'token.txt'
const axios = require('axios').default

module.exports = (on, config) => {
	on('file:preprocessor', cucumber())
	on('task', {
		generateOTP: require('cypress-otp'),
		readTokenFromFileAndCheckValidity() {
			if (fs.existsSync(tokenFile)) {
				// Check the on-disk cache for a token value
				// If present, attempt a token recycle, this tests if the token is still valid
				const token = fs.readFileSync(tokenFile, 'utf8')
				const renewTokenUrl = 'https://api.staging.bitfinex.com/v2/auth/w/token'
				const renewBody = { scope: 'api', writePermission: true, caps: ['o', 'f', 's', 'w'] }
				return axios
					.post(renewTokenUrl, renewBody, {
						headers: {
							'Content-Type': 'application/json',
							'bfx-token': decodeURIComponent(token),
						},
					})
					.then((response) => {
						if (response.status == 200) {
							const token = response.data[0]
							fs.writeFile(tokenFile, token, 'utf8')
							return token
						}
						return null
					})
					.catch((error) => {
						return null
					})
			}
			return null
		},
		writeTokenToFile(token) {
			fs.writeFile(tokenFile, token, 'utf8')
			return null
		},
	})
	on('before:browser:launch', (browser, launchOptions) => {
		if (browser.name === 'chrome') {
			args.push('--lang=de')
			return launchOptions
		}
		if (browser.name === 'firefox') {
			launchOptions.args.push('--lang=de')
			return launchOptions
		}
	})
	on('before:browser:launch', (browser, launchOptions) => {
		if (browser.family === 'chromium' && browser.name !== 'electron') {
			launchOptions.preferences.default.intl = '--lang=de'
			return launchOptions
		}
	})
}
